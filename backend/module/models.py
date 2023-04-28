from . import db
from flask_login import UserMixin

# Define User model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    faceid = db.Column(db.LargeBinary, nullable=True)

# Define Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    due_date = db.Column(db.Date)
    status = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'status': self.status
        }

# Define List model
class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tasks = db.relationship('Task', secondary='list_task')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'tasks': [task.to_dict() for task in self.tasks],
        }

# Define ListTask model
class ListTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'), nullable=False, unique=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False, unique=True)
    added_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
