import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins
basedir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{basedir}/yara.db"
print("Database URI:", app.config["SQLALCHEMY_DATABASE_URI"])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class categories(db.Model):
    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "category_id": self.category_id,
            "category_name": self.category_name,
            "description": self.description
        }

class suppliers(db.Model):
    supplier_id = db.Column(db.Integer, primary_key=True)
    supplier_name = db.Column(db.String(255), nullable=False)
    contact_info = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "supplier_id": self.supplier_id,
            "supplier_name": self.supplier_name,
            "contact_info": self.contact_info
        }

class products(db.Model):
    product_id = db.Column(db.Integer, primary_key=True)
    product_decrip = db.Column(db.String(255), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.category_id"))
    category = db.relationship("categories", foreign_keys=[category_id])
    cost_price = db.Column(db.Float, nullable=False)
    sales_price = db.Column(db.Float, nullable=False)

    def to_dict(self):

        return {
            "product_id": self.product_id,
            "product_decrip": self.product_decrip,
            "category": self.category.category_name,
            "cost_price": self.cost_price,
            "sales_price": self.sales_price,
        }


# Routes
@app.route("/products", methods=["GET"])
def get_products():
    product_list = products.query.all()
    result = [product.to_dict() for product in product_list]
    return jsonify(result)

@app.route("/products/<int:product_id>", methods=["GET"])
def get_product_id(product_id):
    product = products.query.get(product_id)
    if product:
        return jsonify(product.to_dict())
    return jsonify({"error": "Product not found"}), 404

@app.route("/products", methods=["POST"])
def add_product():
    try:
        data = request.get_json()
        new_product = products(
            product_decrip=data.get("product_decrip"),
            category_id=data.get("category"),  # Assuming category ID is sent
            cost_price=data.get("cost_price"),
            sales_price=data.get("sales_price"),
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/categories", methods=["GET"])
def get_categories():
    categories_list = categories.query.all()
    return jsonify([category.to_dict() for category in categories_list])

@app.route("/suppliers", methods=["GET"])
def get_suppliers():
    suppliers_list = suppliers.query.all()
    return jsonify([supplier.to_dict() for supplier in suppliers_list])

if __name__ == "__main__":
    with app.app_context():
        pass  # Prevent db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)