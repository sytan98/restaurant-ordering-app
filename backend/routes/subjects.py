"""
Subjects
"""
from flask import Blueprint, request, abort, jsonify
from database import mongo
from datetime import datetime
from bson import ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity

subjects = Blueprint('subjects', __name__)

@subjects.route('/api/v1/subjects', methods=['POST'])
@jwt_required
def create_subjects():
    """
    Create new subject
    """
    if not request.json or not 'modulecode' in request.json or not 'name' in request.json or not 'difficulty' in request.json:
        abort(400)
    subjects_collection = mongo.db.subjects
    result = request.json
    now = datetime.utcnow()
    result["user"] = get_jwt_identity()
    result["last_modified"] = datetime.timestamp(now)
    subjects_collection.insert_one(result)
    return 'Created new subject'

@subjects.route('/api/v1/subjects', methods=['GET'])
@jwt_required
def get_subjects():
    """
    Get all subjects
    """
    subjects = mongo.db.subjects.find({"user":get_jwt_identity()})
    collection_of_subjects = {str(subject["_id"]): {"name": subject["name"],
                                                    "modulecode": subject["modulecode"],
                                                    "difficulty": subject["difficulty"],
                                                    "last_modified": subject["last_modified"] } 
                                                    for subject in subjects}
    return jsonify(collection_of_subjects)
 
@subjects.route('/api/v1/subject/<string:modulecode>', methods=['GET','PUT','DELETE'])
@jwt_required
def get_subject(modulecode):
    if request.method == 'GET':
        """
        Get subject based on modulecode
        """
        subject = mongo.db.subjects.find_one_or_404({"user":get_jwt_identity(), "modulecode":modulecode})
        return subject
    elif request.method == 'PUT':
        """
        Update subject based on modulecode
        """
        if not request.json:
            abort(400)
        result = request.json
        now = datetime.utcnow()
        result["last_modified"] = datetime.timestamp(now)
        new_values = {"$set": result}
        mongo.db.subjects.update_one({"user":get_jwt_identity(), "modulecode":modulecode}, new_values)
        return 'Updated subject'
    elif request.method == 'DELETE':
        """
        Delete subject based on id
        """
        mongo.db.subjects.delete_one({"user":get_jwt_identity(), "modulecode":modulecode})
        mongo.db.tasks.delete({"user":get_jwt_identity(), "subject_modulecode":modulecode})
        return 'Deleted subject and related tasks'
