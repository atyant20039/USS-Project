from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from .models import User
from flask_login import login_required, login_user, logout_user
import cv2
import numpy as np
from PIL import Image
import io
import base64
import torch
import torchvision.transforms as transforms
from facenet_pytorch import InceptionResnetV1

auth = Blueprint('auth', __name__)

model = InceptionResnetV1(pretrained='vggface2').eval()


@auth.route('/signUp', methods=['POST'])
def signUp():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    image = data.get('image')
    
    # Check if an Email already exists.
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Email already registered.'}), 400
    
    # remove the prefix 'data:image/jpeg;base64,' from the string
    image = image.split(',')[1]
    # decode the base64 string to bytes
    image = base64.b64decode(image)
    new_user = User(email=email, password=generate_password_hash(password), name=name, faceid = image)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'Registration successful.'}), 201


@auth.route('/checkFace', methods=['POST'])
def checkFace():
    data = request.get_json()
    image_data = data['image']
    isFace = face_detect(image_data)
    
    return jsonify({'isFace': isFace}), 201

def extract_features(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    transform = transforms.Compose([
        transforms.ToPILImage(),
        transforms.Resize((160, 160)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
    ])
    x = transform(img).unsqueeze(0)

    # Extract facial features
    with torch.no_grad():
        features = model(x)[0].numpy()
    return features

def face_detect(image_data):
    # remove the prefix 'data:image/jpeg;base64,' from the string
    image_data = image_data.split(',')[1]
    # decode the base64 string to bytes
    image_data = base64.b64decode(image_data)

    image = Image.open(io.BytesIO(image_data))
    # save the bytes as a file
    # check if the directory exists
    image.save('saved_image/new.jpg', 'JPEG')

    image = cv2.imread('saved_image/new.jpg')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.05,
        minNeighbors=3,
        minSize=(30, 30)
    )

    if (len(faces) == 0): return False
    return True


def face_recognition(encoding, threshold=0.6):
    min_dist = 99999
    # keeps track of user authentication status
    authenticate = False
    users = User.query.filter(User.faceid.isnot(None)).all()

    # iterate through the users
    for curr_user in users:
        image = Image.open(io.BytesIO(curr_user.faceid))
        image.save('saved_image/curr_user.jpg', 'JPEG')

        features = extract_features(cv2.imread('saved_image/curr_user.jpg',-1))

        dist = np.linalg.norm(np.subtract(features, encoding))
        # check if minimum distance or not
        if dist < min_dist:
            min_dist = dist
            identity = curr_user.email

    if min_dist > threshold:
        print("User not in the database.")
        identity = 'Unknown Person'
        authenticate = False
    else:
        print(f"Hello {identity}")
        authenticate = True

    return min_dist, identity, authenticate




@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if ('email' in data and 'password' in data):
        email = data['email']
        password = data['password']

        if not email or not password:
            return jsonify({'message': 'Invalid Login-ID'}), 400

        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password, password):
            return jsonify({'message': 'Invalid Password!'}), 400
        login_user(user)
        return jsonify({'message': 'Logged in successfully!'}), 200
    
    elif ('image' in data):
        image_data = data['image']
        isFace = face_detect(image_data)
        if isFace:
            features = extract_features(cv2.imread('saved_image/new.jpg',-1))
            min_dist, email, authenticate = face_recognition(features)
            if authenticate:
                user = User.query.filter_by(email=email).first()
                login_user(user)
                return jsonify({'message': 'Logged in successfully!'}), 200
            return jsonify({'message': 'No Match Found'}), 400 
        else:
            return jsonify({'message': 'No Face Detected!'}), 400


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully!'}), 200