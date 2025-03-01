from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Auto-increment
    username = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    skills = db.Column(db.Text, nullable=False)
    resources = db.Column(db.Text, nullable=False)
    option = db.Column(db.String(20), nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    img_url = db.Column(db.String(255), nullable=True)

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "role": self.role,
            "skills": self.skills,
            "resources": self.resources,
            "option": self.option,
            "gender": self.gender,
            "imgURL": self.img_url,
        }
