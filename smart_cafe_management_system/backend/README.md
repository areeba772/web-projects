# Smart Cafe Management System - Backend

## Setup Instructions

1. Install Python 3.8 or higher

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User signup
- `POST /api/auth/logout` - User logout

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/orders` - Get user order history
- `POST /api/user/orders` - Place new order

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard stats
- `GET /api/admin/cafes` - Get all cafes
- `POST /api/admin/cafes` - Create new cafe

### Food Authority
- `GET /api/food-authority/dashboard` - Get food authority dashboard
- `POST /api/food-authority/notifications` - Send notification

### Menu & Recommendations
- `GET /api/menu/cafes` - Get cafes with menu
- `GET /api/menu/cafes/<cafe_id>/items` - Get menu items for cafe
- `GET /api/menu/recommendations/<user_id>` - Get AI-based recommendations

## Default Credentials

- Admin: `admin@cafe.com` / `admin123`
- User: Sign up through the frontend
- Food Authority: Sign up through the frontend (with role 'food_authority')

