"""
Smart Cafe Management System - Backend API
Flask Application
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import sqlite3
import hashlib
import os
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Database configuration
DB_NAME = 'smart_cafe.db'

# Initialize database
def init_db():
    """Initialize database with required tables"""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            student_id TEXT,
            phone TEXT,
            address TEXT,
            role TEXT NOT NULL DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Cafes table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS cafes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            location TEXT,
            status TEXT DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Menu items table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS menu_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cafe_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            image_url TEXT,
            category TEXT,
            available INTEGER DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (cafe_id) REFERENCES cafes(id)
        )
    ''')
    
    # Orders table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            cafe_id INTEGER NOT NULL,
            total_amount REAL NOT NULL,
            status TEXT DEFAULT 'pending',
            delivery_address TEXT,
            contact_number TEXT,
            payment_method TEXT DEFAULT 'cash',
            jazzcash_tid TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (cafe_id) REFERENCES cafes(id)
        )
    ''')
    
    # Order items table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            menu_item_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
        )
    ''')
    
    # Notifications table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS notifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            from_role TEXT NOT NULL,
            to_role TEXT NOT NULL,
            cafe_id INTEGER,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            read INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (cafe_id) REFERENCES cafes(id)
        )
    ''')
    
    # User preferences for recommendations
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_preferences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            menu_item_id INTEGER NOT NULL,
            rating INTEGER DEFAULT 0,
            order_count INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
        )
    ''')
    
    conn.commit()
    conn.close()
    
    # Insert default admin user if not exists
    create_default_admin()

def create_default_admin():
    """Create default admin user"""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM users WHERE email = ?', ('admin@cafe.com',))
    if not cursor.fetchone():
        password_hash = hashlib.sha256('admin123'.encode()).hexdigest()
        cursor.execute('''
            INSERT INTO users (name, email, password, role)
            VALUES (?, ?, ?, ?)
        ''', ('Admin User', 'admin@cafe.com', password_hash, 'admin'))
        conn.commit()
    
    conn.close()

# Database helper functions
def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def hash_password(password):
    """Hash password using SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

# API Routes - Authentication
@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login"""
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password are required'}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    
    password_hash = hash_password(password)
    cursor.execute('SELECT * FROM users WHERE email = ? AND password = ?', (email, password_hash))
    user = cursor.fetchone()
    
    if user:
        user_dict = {
            'id': user['id'],
            'name': user['name'],
            'email': user['email'],
            'role': user['role'],
            'student_id': user['student_id'],
            'phone': user['phone']
        }
        conn.close()
        return jsonify({'success': True, 'user': user_dict})
    else:
        conn.close()
        return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    """User signup"""
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    student_id = data.get('studentId')
    phone = data.get('phone')
    
    if not all([name, email, password]):
        return jsonify({'success': False, 'message': 'Name, email, and password are required'}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    
    # Check if email already exists
    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    if cursor.fetchone():
        conn.close()
        return jsonify({'success': False, 'message': 'Email already exists'}), 400
    
    # Insert new user
    password_hash = hash_password(password)
    cursor.execute('''
        INSERT INTO users (name, email, password, student_id, phone, role)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (name, email, password_hash, student_id, phone, 'user'))
    
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'message': 'Account created successfully'})

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    """User logout"""
    return jsonify({'success': True, 'message': 'Logged out successfully'})

# API Routes - User
@app.route('/api/user/profile', methods=['GET'])
def get_profile():
    """Get user profile"""
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'User ID required'}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        user_dict = {
            'id': user['id'],
            'name': user['name'],
            'email': user['email'],
            'student_id': user['student_id'],
            'phone': user['phone'],
            'address': user['address'],
            'role': user['role']
        }
        return jsonify({'success': True, 'user': user_dict})
    return jsonify({'success': False, 'message': 'User not found'}), 404

@app.route('/api/user/profile', methods=['PUT'])
def update_profile():
    """Update user profile"""
    data = request.json
    user_id = data.get('user_id')
    email = data.get('email')
    phone = data.get('phone')
    address = data.get('address')
    new_password = data.get('newPassword')
    
    if not user_id:
        return jsonify({'success': False, 'message': 'User ID required'}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    
    update_fields = []
    update_values = []
    
    if email:
        update_fields.append('email = ?')
        update_values.append(email)
    if phone:
        update_fields.append('phone = ?')
        update_values.append(phone)
    if address:
        update_fields.append('address = ?')
        update_values.append(address)
    if new_password:
        password_hash = hash_password(new_password)
        update_fields.append('password = ?')
        update_values.append(password_hash)
    
    if update_fields:
        update_values.append(user_id)
        query = f"UPDATE users SET {', '.join(update_fields)} WHERE id = ?"
        cursor.execute(query, update_values)
        conn.commit()
    
    conn.close()
    return jsonify({'success': True, 'message': 'Profile updated successfully'})

@app.route('/api/user/orders', methods=['GET'])
def get_user_orders():
    """Get user order history"""
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'User ID required'}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    
    # Use LEFT JOIN in case cafe doesn't exist (for new installations)
    cursor.execute('''
        SELECT o.*, COALESCE(c.name, 'Unknown Cafe') as cafe_name
        FROM orders o
        LEFT JOIN cafes c ON o.cafe_id = c.id
        WHERE o.user_id = ?
        ORDER BY o.created_at DESC
    ''', (user_id,))
    
    orders = cursor.fetchall()
    order_list = []
    
    for order in orders:
        # Get order items
        cursor.execute('''
            SELECT oi.*, mi.name as item_name
            FROM order_items oi
            JOIN menu_items mi ON oi.menu_item_id = mi.id
            WHERE oi.order_id = ?
        ''', (order['id'],))
        
        items = cursor.fetchall()
        order_dict = {
            'id': order['id'],
            'cafe_name': order['cafe_name'],
            'total_amount': order['total_amount'],
            'status': order['status'],
            'created_at': order['created_at'],
            'delivery_address': order.get('delivery_address', ''),
            'contact_number': order.get('contact_number', ''),
            'payment_method': order.get('payment_method', 'cash'),
            'jazzcash_tid': order.get('jazzcash_tid', ''),
            'items': [{'name': item['item_name'], 'quantity': item['quantity'], 'price': item['price']} for item in items]
        }
        order_list.append(order_dict)
    
    conn.close()
    return jsonify({'success': True, 'orders': order_list})

@app.route('/api/user/orders', methods=['POST'])
def place_order():
    """Place a new order"""
    data = request.json
    user_id = data.get('user_id')
    cafe_id = data.get('cafe_id')
    items = data.get('items')
    total_amount = data.get('total_amount', 0)
    delivery_address = data.get('delivery_address')
    contact_number = data.get('contact_number')
    payment_method = data.get('payment_method', 'cash')
    jazzcash_tid = data.get('jazzcash_tid')
    
    if not all([user_id, cafe_id, items]):
        return jsonify({'success': False, 'message': 'Missing required fields'}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    
    # Calculate total if not provided
    if not total_amount:
        total = 0
        for item in items:
            menu_item_id = item.get('menu_item_id')
            quantity = item.get('quantity', 1)
            price = item.get('price', 0)
            total += float(price) * int(quantity)
        total_amount = total
    
    # Create order with payment info
    cursor.execute('''
        INSERT INTO orders (user_id, cafe_id, total_amount, status, delivery_address, contact_number, payment_method, jazzcash_tid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (user_id, cafe_id, total_amount, 'pending', delivery_address, contact_number, payment_method, jazzcash_tid))
    
    order_id = cursor.lastrowid
    
    # Create order items
    for item in items:
        menu_item_id = item.get('menu_item_id')
        quantity = item.get('quantity', 1)
        price = item.get('price', 0)
        
        cursor.execute('''
            INSERT INTO order_items (order_id, menu_item_id, quantity, price)
            VALUES (?, ?, ?, ?)
        ''', (order_id, menu_item_id, quantity, price))
    
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'message': 'Order placed successfully', 'order_id': order_id})

# API Routes - Admin
@app.route('/api/admin/dashboard', methods=['GET'])
def admin_dashboard():
    """Get admin dashboard data"""
    conn = get_db()
    cursor = conn.cursor()
    
    # Get statistics
    cursor.execute('SELECT COUNT(*) as count FROM users WHERE role = "user"')
    user_count = cursor.fetchone()['count']
    
    cursor.execute('SELECT COUNT(*) as count FROM cafes')
    cafe_count = cursor.fetchone()['count']
    
    cursor.execute('SELECT COUNT(*) as count FROM orders')
    order_count = cursor.fetchone()['count']
    
    cursor.execute('SELECT COUNT(*) as count FROM orders WHERE status = "pending"')
    pending_orders = cursor.fetchone()['count']
    
    conn.close()
    
    return jsonify({
        'success': True,
        'stats': {
            'users': user_count,
            'cafes': cafe_count,
            'orders': order_count,
            'pending_orders': pending_orders
        }
    })

@app.route('/api/admin/cafes', methods=['GET'])
def get_cafes():
    """Get all cafes"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM cafes ORDER BY created_at DESC')
    cafes = cursor.fetchall()
    conn.close()
    
    cafe_list = [dict(cafe) for cafe in cafes]
    return jsonify({'success': True, 'cafes': cafe_list})

@app.route('/api/admin/cafes', methods=['POST'])
def create_cafe():
    """Create a new cafe"""
    data = request.json
    name = data.get('name')
    description = data.get('description')
    location = data.get('location')
    
    if not name:
        return jsonify({'success': False, 'message': 'Cafe name is required'}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO cafes (name, description, location)
        VALUES (?, ?, ?)
    ''', (name, description, location))
    
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'message': 'Cafe created successfully'})

# API Routes - Food Authority
@app.route('/api/food-authority/dashboard', methods=['GET'])
def food_authority_dashboard():
    """Get food authority dashboard data"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT c.*, 
               (SELECT COUNT(*) FROM menu_items WHERE cafe_id = c.id) as menu_count
        FROM cafes c
    ''')
    cafes = cursor.fetchall()
    conn.close()
    
    cafe_list = [dict(cafe) for cafe in cafes]
    return jsonify({'success': True, 'cafes': cafe_list})

@app.route('/api/food-authority/notifications', methods=['POST'])
def send_notification():
    """Send notification from food authority"""
    data = request.json
    cafe_id = data.get('cafe_id')
    subject = data.get('subject')
    message = data.get('message')
    
    if not all([subject, message]):
        return jsonify({'success': False, 'message': 'Subject and message are required'}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO notifications (from_role, to_role, cafe_id, subject, message)
        VALUES (?, ?, ?, ?, ?)
    ''', ('food_authority', 'admin', cafe_id, subject, message))
    
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'message': 'Notification sent successfully'})

# API Routes - Menu & Recommendations
@app.route('/api/menu/cafes', methods=['GET'])
def get_menu_cafes():
    """Get cafes with menu"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM cafes WHERE status = "active"')
    cafes = cursor.fetchall()
    conn.close()
    
    cafe_list = [dict(cafe) for cafe in cafes]
    return jsonify({'success': True, 'cafes': cafe_list})

@app.route('/api/menu/cafes/<int:cafe_id>/items', methods=['GET'])
def get_menu_items(cafe_id):
    """Get menu items for a cafe"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM menu_items WHERE cafe_id = ? AND available = 1', (cafe_id,))
    items = cursor.fetchall()
    conn.close()
    
    item_list = [dict(item) for item in items]
    return jsonify({'success': True, 'items': item_list})

@app.route('/api/menu/recommendations/<int:user_id>', methods=['GET'])
def get_recommendations(user_id):
    """Get AI-based recommendations for user"""
    conn = get_db()
    cursor = conn.cursor()
    
    # Simple recommendation: get most popular items
    cursor.execute('''
        SELECT mi.*, 
               COUNT(oi.id) as order_count,
               AVG(up.rating) as avg_rating
        FROM menu_items mi
        LEFT JOIN order_items oi ON mi.id = oi.menu_item_id
        LEFT JOIN user_preferences up ON mi.id = up.menu_item_id AND up.user_id = ?
        WHERE mi.available = 1
        GROUP BY mi.id
        ORDER BY order_count DESC, avg_rating DESC
        LIMIT 5
    ''', (user_id,))
    
    items = cursor.fetchall()
    conn.close()
    
    item_list = [dict(item) for item in items]
    return jsonify({'success': True, 'recommendations': item_list})

# Add sample data if tables are empty
def add_sample_data():
    """Add sample cafes and menu items for testing"""
    conn = get_db()
    cursor = conn.cursor()
    
    # Check if cafes exist
    cursor.execute('SELECT COUNT(*) as count FROM cafes')
    cafe_count = cursor.fetchone()['count']
    
    if cafe_count == 0:
        # Add sample cafe
        cursor.execute('''
            INSERT INTO cafes (name, description, location, status)
            VALUES (?, ?, ?, ?)
        ''', ('Cafe De Light', 'Offering a variety of snacks, fast food, and beverages.', 'COMSATS University, Vehari Campus', 'active'))
        cafe_id = cursor.lastrowid
        
        # Add sample menu items
        menu_items = [
            ('Cheese Burger', 'Juicy grilled beef patty with cheese, lettuce, and tomato.', 350, '../../../public/images/burger.jpg', 'Fast Food'),
            ('Margherita Pizza', 'Classic cheesy pizza with a crispy crust and tomato base.', 800, '../../../public/images/pizza.jpg', 'Fast Food'),
            ('White Sauce Pasta', 'Creamy and rich pasta tossed in white sauce and herbs.', 450, '../../../public/images/pasta.jpg', 'Italian'),
            ('Cappuccino', 'Rich espresso with steamed milk foam.', 250, '../../../public/images/coffee.jpg', 'Beverages'),
            ('Club Sandwich', 'Layered sandwich with chicken, egg, and veggies.', 300, '../../../public/images/sandwich.jpg', 'Fast Food'),
            ('Chicken Biryani', 'Aromatic basmati rice with tender chicken pieces.', 500, '../../../public/images/biryani.jpg', 'Pakistani'),
            ('Zinger Burger', 'Crispy chicken fillet with fresh lettuce and special sauce.', 350, '../../../public/images/burger.jpg', 'Fast Food')
        ]
        
        for item in menu_items:
            cursor.execute('''
                INSERT INTO menu_items (cafe_id, name, description, price, image_url, category, available)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (cafe_id, item[0], item[1], item[2], item[3], item[4], 1))
        
        conn.commit()
    
    conn.close()

if __name__ == '__main__':
    init_db()
    add_sample_data()  # Add sample data for testing
    print("=" * 50)
    print("Smart Cafe Management System - Backend Server")
    print("=" * 50)
    print("Server running on: http://127.0.0.1:5000")
    print("API Base URL: http://127.0.0.1:5000/api")
    print("=" * 50)
    app.run(debug=True, port=5000, host='127.0.0.1')

