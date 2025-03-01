from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__) # Needed so that Flask knows where to look for resources such as templates and static files
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///roles.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

import routes

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)