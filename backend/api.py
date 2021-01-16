import os 
from dotenv import load_dotenv
from datetime import datetime

from flask_pymongo import PyMongo
from flask import Flask, jsonify, request, abort
from flask_bcrypt import Bcrypt

from database import mongo
from routes.subjects import subjects
from routes.tasks import tasks
from routes.auth import auth
from flask_jwt_extended import JWTManager

app = Flask(__name__)
load_dotenv('.env')
app.config["MONGO_URI"] = os.environ.get('ATLAS_URL')
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY')

mongo.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

app.register_blueprint(subjects)
app.register_blueprint(tasks)
app.register_blueprint(auth)
