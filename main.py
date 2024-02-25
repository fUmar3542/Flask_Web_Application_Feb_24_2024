from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)


# ******************************************
# Function to establish database connection
# ******************************************
def get_db_connection():
    """
    Function to establish a connection to the SQLite database.
    """
    conn = None
    try:
        conn = sqlite3.connect('database.db')
        conn.row_factory = sqlite3.Row
    except Exception as ex:
        print(ex)
    finally:
        return conn


# ******************************************
# Function to initialize the database
# ******************************************
def init_db():
    """
    Function to initialize the database by executing the SQL commands stored in schema.sql.
    """
    try:
        conn = get_db_connection()
        with app.open_resource('schema.sql', mode='r') as f:
            conn.cursor().executescript(f.read())
        conn.commit()
        conn.close()
    except Exception as ex:
        print(ex)

# Initialize the database if not already created
init_db()


# ******************************************
# Route to add customer in database
# ******************************************
@app.route('/add_customer', methods=['POST'])
def create_customer():
    """
    Endpoint to create a new customer.
    """
    try:
        conn = get_db_connection()              # Estabish db connection
        cursor = conn.cursor()
        name1 = request.form.get("name1")       # get form data
        name2 = request.form.get("name2")
        age = request.form.get("age")
        country = request.form.get("country")
        cursor.execute("INSERT INTO Customer_DB (Customer_First_Name, Customer_Last_Name, Age, Country) VALUES (?, ?, ?, ?)",
                       (name1, name2, age, country))
        customer_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return jsonify({'message': 'Customer created successfully', 'id': customer_id}), 201
    except Exception as e:
        return jsonify({'message': 'Error occurred while creating customer', 'error': str(e)}), 500


# ******************************************
# Route to get customer details from database
# ******************************************
@app.route('/get_customer/<int:id>', methods=['GET'])
def get_customer(id):
    """
    Endpoint to retrieve a specific customer by ID.
    """
    try:
        conn = get_db_connection()              # Establish connection
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Customer_DB WHERE Customer_ID=?", (id,))
        customer = cursor.fetchone()
        conn.close()
        if customer:
            return jsonify(dict(customer)), 200
        else:
            return jsonify({'error': 'Customer not found'}), 404
    except Exception as e:
        return jsonify({'message': 'Error occurred while getting customer details', 'error': str(e)}), 500


# ******************************************
# Function to get all customers from database
# ******************************************
def get_all_customers():
    """
    Endpoint to retrieve all customer.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Customer_DB")
        customer = cursor.fetchall()
        conn.close()
        return customer
    except:
        return None


# ******************************************
# Route to update customer in database
# ******************************************
@app.route('/update_customer/<int:id>', methods=['POST'])
def update_customer(id):
    """
    Endpoint to update a customer's information.
    """
    try:
        name1 = request.form.get("name1")
        name2 = request.form.get("name2")
        age = request.form.get("age")
        country = request.form.get("country")
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE Customer_DB SET Customer_First_Name=?, Customer_Last_Name=?, Age=?, Country=? WHERE Customer_ID=?",
                       (name1, name2, age, country, id))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Customer updated successfully!!!'}), 200
    except Exception as e:
        return jsonify({'message': 'Error occurred while updating customer', 'error': str(e)}), 500


# ******************************************
# Route to delete customer from database
# ******************************************
@app.route('/delete_hr/<int:id>', methods=['GET'])
def delete_customer(id):
    """
    Endpoint to delete a customer by ID.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Customer_DB WHERE Customer_ID=?", (id,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Customer Deleted Successfully'}), 201
    except Exception as e:
        return jsonify({'message': 'Error occurred while deleting customer', 'error': str(e)}), 500


# ******************************************
# Home Page route
# ******************************************
@app.route("/")
def index():
    try:
        data = {"customers": get_all_customers()}
        return render_template("dashboard-admin.html", data=data, message="")   # Home page html render
    except Exception as ex:
        print(ex)
        return render_template("error.html")            # In case of error render error.html


# ******************************************
# Start application
# ******************************************
if __name__ == '__main__':
    app.run(debug=True)
