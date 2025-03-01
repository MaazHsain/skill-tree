from app import app, db
from flask import request, jsonify
from models import User

# Get all users
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all() # will return roles in the form of python objects thats y we need the conversion
    json_users = [user.to_json() for user in users]
    return jsonify({"Users": json_users}), 200

# Create a new user
@app.route("/users", methods=["POST"])
def create_user():
    try:
        data = request.json

        required_fields = ["name","role","skills","resources","option","gender"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error":f'Missing required field: {field}'}), 400

        username = data.get("name")
        role = data.get("role")
        skills = data.get("skills")
        resources = data.get("resources")
        option = data.get("option")
        gender = data.get("gender")

        if option and option not in ["Current role", "Prior experience"]:  
            return (
                jsonify({"message": "Invalid option value"}), 400,
            )

        # fetch avatar image based on role
        if gender == "male":
            img_url = f'https://avatar.iran.liara.run/public/boy?username={username}'
        elif gender == "female":
            img_url = f'https://avatar.iran.liara.run/public/girl?username={username}'
        else:
            img_url = None

        new_user = User(
            username = username,
            role=role,
            skills=skills,
            resources=resources,
            option = option,
            gender = gender,
            img_url = img_url
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created!", "User Id": new_user.id, "Username": new_user.username}), 201 # 201 means resource created
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

# Delete user 
@app.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    try:
        user = User.query.get(id)
        
        if not user:
            return jsonify({"message": "User not found"}), 404

        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

# Update user 
@app.route("/users/<int:id>", methods=["PATCH"])
def update_user(id):
    try:
        user = User.query.get(id)
        
        if not user:
            return jsonify({"message": "User not found"}), 404

        data = request.json

        user.username = data.get("name",user.username)
        user.role = data.get("role",user.role)
        user.skills = data.get("skills",user.skills)
        user.resources = data.get("resources",user.resources)
        user.option = data.get("option",user.option)

        db.session.commit()

        return jsonify({"message": "User card updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500