from flask import Blueprint, jsonify, request, Response
from .models import List, ListTask, User, Task
from . import db
from datetime import datetime
from flask_login import current_user, login_required

views = Blueprint('views', __name__)

# @views.route('/<list>', methods=['GET'])
# def getList(list):
#     # user_id = get_user_id_from_token()

#     # Query the database to get the list and tasks associated with the list
#     # list = List.query.filter_by(name=list, created_by=user_id).first()
#     list = List.query.filter_by(name=list).first()
#     if list:
#         tasks = list.tasks
#         # Return a JSON response containing the tasks
#         return jsonify({'tasks': [task.to_dict() for task in tasks]})
#     else:
#         # Return a 404 response if the list is not found
#         return Response(status=404)
    

@views.route('/<list_name>', methods=['GET'])
@login_required
def get_tasks(list_name):
    tasks = Task.query.join(ListTask).join(List).filter(List.name == list_name, List.created_by == current_user.id).all()
    task_list = []
    for task in tasks:
        task_list.append({
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'due_date': task.due_date.isoformat() if task.due_date else None,
            'status': task.status
        })
    return jsonify({'tasks': task_list})


@views.route('/getLists', methods=['GET'])
@login_required
def get_lists():
    user_id = current_user.id
    lists = List.query.filter_by(created_by=user_id).all()
    lists_json = jsonify([list.to_dict() for list in lists])
    return lists_json

# Create a function to handle creating a new task
@views.route('/tasks', methods=['POST'])
@login_required
def create_task():
    # Get request data
    data = request.get_json()

    # Validate input
    if 'title' not in data or not data['title']:
        return jsonify({'message': 'Title is required.'}), 400

    # Get current user
    user = current_user

    # Create new task object
    task = Task(title=data['title'], description=data.get('description'), due_date=data.get('due_date'), created_by=user.id)

    # Add task to lists
    if 'lists' in data:
        for list_name in data['lists']:
            task_list = List.query.filter_by(name=list_name, created_by=user.id).first()
            if task_list:
                task_list.tasks.append(task)

    # Save task to database
    db.session.add(task)
    db.session.commit()

    # Return response
    return jsonify(task.to_dict()), 201


@views.route('/tasks/<int:id>', methods=['PUT'])
@login_required
def update_task(id):
    task = Task.query.filter_by(id=id, created_by=current_user.id).first()

    if not task:
        return jsonify({'message': 'Task not found or not authorized.'}), 404

    data = request.get_json()

    if 'title' in data and not isinstance(data['title'], str):
        return jsonify({'message': 'Invalid title.'}), 400

    if 'description' in data and not isinstance(data['description'], str):
        return jsonify({'message': 'Invalid description.'}), 400

    if 'status' in data and not isinstance(data['status'], int):
        return jsonify({'message': 'Invalid status.'}), 400

    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.due_date = datetime.strptime(data['due_date'], '%Y-%m-%d').date()
    task.status = data.get('status', task.status)

    # Update lists
    if 'lists' in data:
        task.lists = []
        for list_name in data['lists']:
            task_list = List.query.filter_by(name=list_name, created_by=current_user.id).first()
            if task_list:
                task.lists.append(task_list)

    db.session.commit()

    return jsonify(task.to_dict()), 200


@views.route('/tasks/<int:task_id>', methods=['DELETE'])
@login_required
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)

    # Check if user is authorized to delete the task
    if task.created_by != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403

    db.session.delete(task)
    db.session.commit()

    return jsonify({'message': 'Task deleted successfully'}), 200

@login_required
@views.route('/createList', methods=['POST'])
def create_list():
    name = request.json.get('name')
    if not name:
        return jsonify({'message': 'Name is required'}), 400

    list_obj = List(name=name, created_by=current_user.id)
    db.session.add(list_obj)
    db.session.commit()

    return jsonify({'list': list_obj.to_dict()}), 201

@login_required
@views.route('/edit/<int:list_id>', methods=['PUT'])
def update_list(request, list_id):
    list_data = request.get_json()

    # validate input
    if not list_data:
        return jsonify({'message': 'No input data provided'}), 400
    name = list_data.get('name')
    if not name:
        return jsonify({'message': 'Name is required'}), 400

    # find the list in the database
    task_list = List.query.get(list_id)
    if not task_list:
        return jsonify({'message': 'List not found'}), 404

    # update fields
    task_list.name = name

    # save to database
    db.session.commit()

    return jsonify({'message': 'List updated successfully'})


@views.route('/lists/<list_name>', methods=['DELETE'])
@login_required
def delete_list(list_name):
    user = current_user
    try:
        task_list = List.query.filter_by(name=list_name, created_by=user).one()
        db.session.delete(task_list)
        db.session.commit()
        return jsonify({'success': True, 'message': 'List deleted successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': 'An error occurred while deleting the list', 'message': str(e)}), 500
