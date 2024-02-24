from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)


# Function to establish database connection
def get_db_connection():
    """
    Function to establish a connection to the SQLite database.
    """
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


# Function to initialize the database
def init_db():
    """
    Function to initialize the database by executing the SQL commands stored in schema.sql.
    """
    conn = get_db_connection()
    with app.open_resource('schema.sql', mode='r') as f:
        conn.cursor().executescript(f.read())
    conn.commit()
    conn.close()


# Initialize the database if not already created
init_db()


# CRUD operations for Customer
@app.route('/customer', methods=['POST'])
def create_customer():
    """
    Endpoint to create a new customer.
    """
    conn = get_db_connection()
    data = request.get_json()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Customer_DB (Customer_First_Name, Customer_Last_Name, Age, Country) VALUES (?, ?, ?, ?)",
                   (data['Customer_First_Name'], data['Customer_Last_Name'], data['Age'], data['Country']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Customer created successfully'}), 201


@app.route('/customer/<int:id>', methods=['GET'])
def get_customer(id):
    """
    Endpoint to retrieve a specific customer by ID.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Customer_DB WHERE Customer_ID=?", (id,))
    customer = cursor.fetchone()
    conn.close()
    if customer:
        return jsonify(dict(customer)), 200
    else:
        return jsonify({'error': 'Customer not found'}), 404


@app.route('/customer/<int:id>', methods=['PUT'])
def update_customer(id):
    """
    Endpoint to update a customer's information.
    """
    conn = get_db_connection()
    data = request.get_json()
    cursor = conn.cursor()
    cursor.execute("UPDATE Customer_DB SET Customer_First_Name=?, Customer_Last_Name=?, Age=?, Country=? WHERE Customer_ID=?",
                   (data['Customer_First_Name'], data['Customer_Last_Name'], data['Age'], data['Country'], id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Customer updated successfully'}), 200


@app.route('/customer/<int:id>', methods=['DELETE'])
def delete_customer(id):
    """
    Endpoint to delete a customer by ID.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Customer_DB WHERE Customer_ID=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Customer deleted successfully'}), 200


# CRUD operations for Order
@app.route('/order', methods=['POST'])
def create_order():
    """
    Endpoint to create a new order.
    """
    conn = get_db_connection()
    data = request.get_json()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Order_DB (Date, Customer_ID, Price, Chair, Stool, 'Table', Cabinet, Dresser, Couch, Bed, Shelf) "
                   "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                   (data['Date'], data['Customer_ID'], data['Price'], data['Chair'], data['Stool'], data['Table'], data['Cabinet'],
                    data['Dresser'], data['Couch'], data['Bed'], data['Shelf']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Order created successfully'}), 201


@app.route('/order/<int:id>', methods=['GET'])
def get_order(id):
    """
    Endpoint to retrieve a specific order by ID.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Order_DB WHERE Order_ID=?", (id,))
    order = cursor.fetchone()
    conn.close()
    if order:
        return jsonify(dict(order)), 200
    else:
        return jsonify({'error': 'Order not found'}), 404


@app.route('/order/<int:id>', methods=['PUT'])
def update_order(id):
    """
    Endpoint to update an order's information.
    """
    conn = get_db_connection()
    data = request.get_json()
    cursor = conn.cursor()
    cursor.execute("UPDATE Order_DB SET Date=?, Customer_ID=?, Price=?, Chair=?, Stool=?, 'Table'=?, Cabinet=?, Dresser=?, Couch=?, Bed=?, Shelf=? "
                   "WHERE Order_ID=?",
                   (data['Date'], data['Customer_ID'], data['Price'], data['Chair'], data['Stool'], data['Table'], data['Cabinet'],
                    data['Dresser'], data['Couch'], data['Bed'], data['Shelf'], id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Order updated successfully'}), 200


@app.route('/order/<int:id>', methods=['DELETE'])
def delete_order(id):
    """
    Endpoint to delete an order by ID.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Order_DB WHERE Order_ID=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Order deleted successfully'}), 200


@app.route("/")
def index():
    try:
        data = {"customers": []}
        return render_template("dashboard-admin.html", data=data)
    except Exception as ex:
        print(ex)
        return render_template("error.html")


if __name__ == '__main__':
    app.run(debug=True)
