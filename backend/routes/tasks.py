"""
Tasks
"""
from flask import Blueprint, request, abort, jsonify
from database import mongo
from datetime import datetime
from bson import ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity
import json


tasks = Blueprint('tasks', __name__)

@tasks.route('/api/v1/task', methods=['POST'])
@jwt_required
def create_tasks():
    """
    Create new task
    """
    if not request.json or \
        not 'title' in request.json or \
        not 'description' in request.json or \
        not 'subject_modulecode' in request.json or \
        not 'planned_time' in request.json or \
        not 'completed' in request.json:
        abort(400)
    print(request.json)
    tasks_collection = mongo.db.tasks
    result = request.json
    now = datetime.utcnow()
    result["user"] = get_jwt_identity()
    result["created"] = datetime.timestamp(now)
    result["last_modified"] = datetime.timestamp(now)
    tasks_collection.insert_one(result)
    return 'Created new task'

@tasks.route('/api/v1/tasks', methods=['GET'])
@jwt_required
def get_tasks():
    """
    Get all tasks
    """
    tasks = mongo.db.tasks.find({"user":get_jwt_identity()})
    collection_of_tasks = [{"title": task["title"], 
                            "description": task["description"],
                            "subject_modulecode": task["subject_modulecode"],
                            "created": task["created"],
                            "completed": task["completed"],
                            "planned_time": task["planned_time"] } 
                            for task in tasks]
    return json.dumps(collection_of_tasks)
 
@tasks.route('/api/v1/task/id/<string:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required
def get_task_id(id):
    if not ObjectId.is_valid(id):
        abort(400)   
    if request.method == 'GET':
        """
        Get task based on id
        """
        task = mongo.db.tasks.find_one_or_404({"_id":ObjectId(id), "user":get_jwt_identity()})
        task_cleaned = {str(task["_id"]): {"title": task["title"], 
                                            "description": task["description"],
                                            "subject_modulecode": task["subject_modulecode"],
                                            "created": task["created"],
                                            "completed": task["completed"],
                                            "planned_time": task["planned_time"] }}
        return jsonify(task_cleaned)
    elif request.method == 'PUT':
        """
        Update task based on id
        """
        if not request.json:
            abort(400)    
        result = request.json
        now = datetime.utcnow()
        result["last_modified"] = datetime.timestamp(now)
        new_values = {"$set": result}
        mongo.db.tasks.update_one({"_id":ObjectId(id), "user":get_jwt_identity()}, new_values)
        return 'Updated task'

    elif request.method == 'DELETE':
        """
        Delete task based on id
        """
        mongo.db.tasks.delete_one({"_id":ObjectId(id), "user":get_jwt_identity()})
        return 'Deleted task'

@tasks.route('/api/v1/task/modulecode/<string:subject_modulecode>', methods=['GET'])
@jwt_required
def get_task_modulecode(subject_modulecode):
    """
    Get tasks based on module_code
    """
    tasks = mongo.db.tasks.find({"subject_modulecode":subject_modulecode, "user":get_jwt_identity()})
    collection_of_tasks = {str(task["_id"]): {"title": task["title"], 
                                              "description": task["description"],
                                              "subject_modulecode": task["subject_modulecode"],
                                              "created": task["created"],
                                              "completed": task["completed"],
                                              "planned_time": task["planned_time"] } 
                                              for task in tasks}
    return jsonify(collection_of_tasks)
