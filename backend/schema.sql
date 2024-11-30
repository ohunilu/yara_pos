-- Create categories table
CREATE TABLE categories (
  category_id INTEGER PRIMARY KEY,
  category_name VARCHAR(255),
  description TEXT
);

-- Create suppliers table
CREATE TABLE suppliers (
  supplier_id INTEGER PRIMARY KEY,
  supplier_name VARCHAR(255),
  contact_info TEXT
);

-- Create roles table
CREATE TABLE roles (
  role_id INTEGER PRIMARY KEY,
  role_name VARCHAR(255),
  description TEXT
);

-- Create products table
CREATE TABLE products (
  product_id INTEGER PRIMARY KEY,
  product_decrip VARCHAR(255),
  category_id INTEGER,
  cost_price DECIMAL(10, 2),
  sales_price DECIMAL(10, 2),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Create users table
CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  user_name VARCHAR(255),
  user_password VARCHAR(255),
  role_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- Create orders table
CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  order_date DATE,
  email VARCHAR(255),
  total_amount DECIMAL(10, 2),
  tax_amount DECIMAL(10, 2),
  paymentMethod VARCHAR(50),
  FOREIGN KEY (email) REFERENCES users(email)
);

-- Create order_details table
CREATE TABLE order_details (
  order_item_id INTEGER PRIMARY KEY,
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  total_price DECIMAL(10, 2),
  discount DECIMAL(10, 2),
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
