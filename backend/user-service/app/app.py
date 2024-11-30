import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins
# Retrieve database path from the environment variable for containerized use
basedir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{basedir}/yara.db"
print("Database URI:", app.config["SQLALCHEMY_DATABASE_URI"])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Database models
class Role(db.Model):
    __tablename__ = "roles"
    role_id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "role_id": self.role_id,
            "role_name": self.role_name,
            "description": self.description,
        }


class User(db.Model):
    __tablename__ = "users"
    email = db.Column(db.String(255), primary_key=True)
    user_name = db.Column(db.String(255), nullable=False)
    user_password = db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey("roles.role_id"), nullable=False)
    role = db.relationship("Role", backref="users", lazy=True)

    def to_dict(self):
        return {
            "email": self.email,
            "user_name": self.user_name,
            "user_password": self.user_password,
            "role": self.role.to_dict(),
        }


# Routes
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


@app.route("/users/<string:email>", methods=["GET"])
def get_user(email):
    user = User.query.get(email)
    if user:
        return jsonify(user.to_dict())
    return jsonify({"error": "User not found"}), 404

@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    print(f"Login attempt - Username: {username}, Password: {password}")  # Debug input

    user = User.query.filter_by(email=username).first()
    print(f"User found: {user}")  # Check if user is found

    if user:
        print(f"Stored Password Hash: {user.user_password}")
        # Verify password
        if bcrypt.check_password_hash(user.user_password, password):
            print(f"Password match for user {username}")
            print(f"User role: {user.role.role_name}")
            
            # Normalize role names
            role_name = user.role.role_name.lower()  # Convert to lowercase for consistency
            if role_name in ['admin', 'administrator', 'manager']:
                return jsonify({'success': True, 'redirect': '/dashboard', 'role': role_name})
            elif role_name == 'cashier':
                return jsonify({'success': True, 'redirect': '/pos', 'role': role_name})
            else:
                print(f"Unrecognized role: {role_name}")
                return jsonify({'success': False, 'message': 'Unrecognized role'})
        else:
            print("Password mismatch")  # Debug incorrect password
    else:
        print("User not found")  # Debug missing user

    return jsonify({'success': False, 'message': 'Invalid username or password'})




if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5002, debug=True)
