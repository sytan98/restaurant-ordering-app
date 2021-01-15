import os 
from flask_pymongo import PyMongo
from flask import Flask, jsonify, request, abort
from datetime import datetime
import json

app = Flask(__name__)
app.config["MONGO_URI"] = os.environ.get('ATLAS_URL')
mongo = PyMongo(app)

@app.route('/time', methods=['GET'])
def get_current_time():
    return {'time':datetime.utc()}

# Subjects
@app.route('/subjects', methods=['GET'])
def get_subjects():
    subjects = mongo.db.subjects.find()
    collection_of_subjects = {idx: {"name": subject["name"], 
                                    "difficulty": subject["difficulty"],
                                    "last_modified": subject["last_modified"] } 
                                    for idx, subject in enumerate(subjects)}
    return json.dumps(collection_of_subjects)
 
@app.route('/subject/<modulecode>', methods=['GET'])
def get_subject(modulecode):
    subject = mongo.db.subjects.find_one_or_404({"_id":str(modulecode)})
    return subject

@app.route('/subjects', methods=['POST'])
def create_subjects():
    if not request.json or not '_id' in request.json or not 'name' in request.json or not 'difficulty' in request.json:
        abort(400)
    subjects_collection = mongo.db.subjects
    result = request.json
    now = datetime.utcnow()
    result["last_modified"] = datetime.timestamp(now)
    subjects_collection.insert_one(result)
    return 'Created new subject'

@app.route('/subject/update/<modulecode>', methods=['PUT'])
def update_subject(modulecode):
    if not request.json:
        abort(400)
    result = request.json
    now = datetime.utcnow()
    result["last_modified"] = datetime.timestamp(now)
    new_values = {"$set": result}
    mongo.db.subjects.update_one({"_id":str(modulecode)}, new_values)
    return 'Update subject'

@app.route('/subject/<modulecode>', methods=['DELETE'])
def delete_subject(modulecode):
    mongo.db.subjects.delete_one({"_id":str(modulecode)})
    return 'Deleted subject'

# Tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = mongo.db.tasks.find()
    collection_of_tasks = {idx: {"title": task["title"], 
                                "description": task["description"],
                                "subject_modulecode": task["subject_modulecode"],
                                "created": task["created"],
                                "completed": task["completed"],
                                "planned_time": task["planned_time"] } 
                                for idx, task in enumerate(tasks)}
    return json.dumps(collection_of_tasks)
 
@app.route('/task/<int:id>', methods=['GET'])
def get_task(id):
    task = mongo.db.tasks.find_one_or_404({"_id":id})
    return task

@app.route('/task', methods=['POST'])
def create_tasks():
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
    result["created"] = datetime.timestamp(now)
    result["last_modified"] = datetime.timestamp(now)
    tasks_collection.insert_one(result)
    return 'Created new task'

@app.route('/task/update/<int:id>', methods=['PUT'])
def update_task(id):
    if not request.json:
        abort(400)    
    result = request.json
    now = datetime.utcnow()
    result["last_modified"] = datetime.timestamp(now)
    new_values = {"$set": result}
    mongo.db.tasks.update_one({"_id":id}, new_values)
    return 'Update task'

@app.route('/task/delete/<int:id>', methods=['DELETE'])
def delete_task(id):
    mongo.db.tasks.delete_one({"_id":id})
    return 'Deleted task'