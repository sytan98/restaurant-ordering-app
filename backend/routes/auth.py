"""
Auth
"""
from flask import Blueprint, request, abort, jsonify
from database import mongo
from datetime import datetime, timedelta
from bson import ObjectId
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

auth = Blueprint('auth', __name__)

@auth.route('/api/v1/auth/signup', methods=['POST'])
def signup():
    """
    Create new user
    """
    if not request.json or not '_id' in request.json or not 'password' in request.json:
        abort(400)
    users_collection = mongo.db.users
    result = request.json
    now = datetime.utcnow()
    result["password"] = generate_password_hash(result["password"]).decode('utf8')
    result["created"] = datetime.timestamp(now)
    users_collection.insert_one(result)
    return 'Created new user'

@auth.route('/api/v1/auth/login', methods=['POST'])
def login():
    """
    Checking User Password and Creating Access Token
    """
    if not request.json or not '_id' in request.json or not 'password' in request.json:
        abort(400)
    result = request.json
    user_details = mongo.db.users.find_one_or_404({"_id":result["_id"]})
    authorised = check_password_hash(user_details["password"], result["password"])
    
    if not authorised:
        return {'error': 'Email or password invalid'}, 401

    expires = timedelta(days=7)
    access_token = create_access_token(identity=user_details["_id"], expires_delta=expires)
    return {'token': access_token}, 200

@auth.route('/api/v1/auth/user', methods=['GET'])
@jwt_required
def get_user():
    if request.method == 'GET':
        """
        Get User
        """
        user = mongo.db.users.find_one_or_404({"_id":get_jwt_identity()})
        return user