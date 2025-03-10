from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__) # Needed so that Flask knows where to look for resources such as templates and static files
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///teckStack.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

dist_folder = os.path.join(os.getcwd(),"..","frontend","dist")

# to serve static files from the 'dist' folder
@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
  if not filename:
    filename = "index.html"
  return send_from_directory(dist_folder,filename)

# api routes
import routes

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)