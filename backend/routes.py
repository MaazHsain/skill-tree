from app import app, db
from flask import request, jsonify
from models import Tech

# Get tech stack
@app.route("/techStack", methods=["GET"])
def get_techStack():
    techStack = Tech.query.all() # will return tech stack in the form of python objects thats y we need the conversion
    json_techStack = [tech.to_json() for tech in techStack]
    return jsonify(json_techStack), 200

# Add new tech
@app.route("/techStack", methods=["POST"])
def add_tech():
    try:
        data = request.json

        required_fields = ["name","category","roles","resources"]

        valid_categories = ['Language', 'Web(Backend)', 'Web(Frontend)', 'Deployment(Backend)', 'Deployment(Frontend)', 'Relational Database', 'NoSQL Database', 'Big Data Tool', 'Cloud Data Warehouse', 'Orchestration', 'Data Transformation', 'Data Manipulation', 'Containerization']

        valid_mastery = ["Beginner","Intermediate", "Advanced"]

        # Check if tech already exists
        name = data.get("name")
        existing_tech = Tech.query.filter_by(name=name).first()
        if existing_tech:
            return jsonify({"error": f"{name} already exists in the database, you may want to update instead"}), 409

        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error":f'Missing required field: {field}'}), 400

        
        category = data.get("category")
        roles = data.get("roles")
        resources = data.get("resources")
        mastery = data.get("mastery", "Beginner")

        if category not in valid_categories:
            return jsonify({"error": f"Invalid category. Must be one of {', '.join(valid_categories)}"}), 400

        if mastery not in valid_mastery:
            return jsonify({"error": f"Invalid mastery. Must be one of {', '.join(valid_mastery)}"}), 400

        # fetch avatar image based on role
        img_url = f'https://avatar.iran.liara.run/username?username={name}'

        new_tech = Tech(
            name = name,
            category = category,
            roles=roles,
            resources=resources,
            mastery = mastery,
            img_url = img_url
        )

        db.session.add(new_tech)
        db.session.commit()

        return jsonify(new_tech.to_json()), 201 # 201 means resource created
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

# Remove Tech 
@app.route("/techStack/<int:id>", methods=["DELETE"])
def remove_tech(id):
    try:
        tech = Tech.query.get(id)
        
        if not tech:
            return jsonify({"message": "No such tech to delete"}), 404

        db.session.delete(tech)
        db.session.commit()

        return jsonify({"message": "Tech removed from tech stack successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

# Update tech 
@app.route("/techStack/<int:id>", methods=["PATCH"])
def update_tech(id):
    try:
        tech = Tech.query.get(id)
        
        if not tech:
            return jsonify({"message": "No such tech to update"}), 404

        data = request.json

        tech.name = data.get("name",tech.name)
        tech.category = data.get("category",tech.category)
        tech.roles = data.get("roles",tech.roles)
        tech.resources = data.get("resources",tech.resources)
        tech.mastery = data.get("mastery",tech.mastery)

        db.session.commit()

        return jsonify(tech.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500