# USS Project - Face ID Authentication Website

## Description

This project is a website that allows users to register and login using face recognition. The website uses FaceNet Model with Keras to process the user's face image.

The motivation for this project was to create a secure and convenient way of authentication using biometrics. The project solves the problem of remembering passwords or losing access to accounts.

## Table of Contents

- [Project Setup](#project-setup)
- [Usage](#usage)
- [Author](#author)

## Project Setup

To install and run this project, you need to have Python 3 and Nodejs installed on your system.

1. Clone this repository to your local machine:

```bash
git clone https://github.com/atyant20039/USS-Project--Face-ID-Authentication-Website.git
```
2. Navigate to the project directory:
```bash
cd USS-Project--Face-ID-Authentication-Website
```
3. Install the required packages for backend:
```bash
cd backend
pip install -r requirements.txt
```
4. Run the backend:
```bash
python main.py
```
5. Open another terminal and Navigate to frontend folder in project directory:
```bash
cd frontend
```
6. Install the Node modules
```bash
npm install
```
7. Run the frontend:
```bash
npm run dev
```
8. Open your browser and go to http://localhost:5173/ to see the website.

## Usage
To use this website, follow these steps:

1. Visit the website at https://localhost:5173/ and sign up for a free account.
2. You can then login with your face image or email address and password.
2. Once you are logged in, you will see your dashboard with an empty todo list.
3. To add a new task, click on the "+" button at the bottom right corner of the screen and enter the task tile, description and due date (optional).
4. To mark a task as completed, click on the checkbox next to the task name.
5. To edit or delete a task, hover over the task name and click on the pencil or trash icons that appear.
6. To view your completed tasks, click on the "Completed" tab at the top of the screen.
7. To log out, click on "Logout" at the top right corner of the screen.

## Author
This project was created by **[Atyant Sony](https://github.com/atyant20039)** and **[Singh Ayush Kumar Satish](https://github.com/Ayush0520)** as part of their USS project in 6th Sem at Indraprastha Institute of Information Technology, Delhi.

