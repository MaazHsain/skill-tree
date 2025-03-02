from app import db

class Tech(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Auto-increment
    name = db.Column(db.String(100), nullable=False, unique=True)
    category = db.Column(db.String(100), nullable=False)
    roles = db.Column(db.Text, nullable = False)
    resources = db.Column(db.Text, nullable=False)
    mastery = db.Column(db.String(20), nullable=False, default='Beginner') # Option : Beg - Int - Adv
    img_url = db.Column(db.String(255), nullable=True)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "roles": self.roles,
            "resources": self.resources,
            "mastery": self.mastery,
            "imgURL": self.img_url,
        }
