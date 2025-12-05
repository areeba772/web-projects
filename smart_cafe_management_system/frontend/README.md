# Smart Cafe Management System - Frontend

## Project Structure

```
frontend/
├── public/
│   ├── css/          # Additional CSS files
│   ├── images/       # Image assets
│   └── js/           # JavaScript utilities
│       ├── validation.js      # Form validation utilities
│       ├── auth.js            # Authentication and session management
│       ├── cart.js            # Shopping cart management
│       ├── api.js             # API client utilities
│       └── recommendations.js # AI recommendation system
├── src/
│   ├── index.html            # Home page
│   ├── app.js               # Main application script
│   ├── styles/
│   │   ├── main.css         # Main stylesheet
│   │   └── variables.css    # CSS variables
│   └── pages/
│       ├── User/            # User pages
│       │   ├── Login.html
│       │   ├── Signup.html
│       │   ├── UserDashboard.html
│       │   ├── BrowseMenu.html
│       │   ├── MyCart.html
│       │   ├── OrderHistory.html
│       │   ├── OrderPage.html
│       │   ├── ProfileSettings.html
│       │   └── HelpSupport.html
│       ├── Admin/           # Admin pages
│       │   ├── AdminDashboard.html
│       │   └── ManageCafes.html
│       └── FoodAuthority/   # Food Authority pages
│           ├── FoodAuthorityPortal.html
│           └── Notifications.html
└── README.md
```

## Features

- **User Authentication**: Login, Signup, Logout with validation
- **User Dashboard**: View recommendations, browse cafes, manage cart
- **Shopping Cart**: Add/remove items, update quantities
- **Order Management**: Place orders, view order history
- **Admin Dashboard**: Manage cafes, menus, orders, users
- **Food Authority Portal**: Monitor cafe rates, send notifications
- **AI Recommendations**: Personalized food recommendations based on user behavior

## Getting Started

1. Open `src/index.html` in a web browser
2. For backend integration, ensure the backend server is running on `http://localhost:5000`

## Validation Features

All forms include comprehensive validation:
- **Email**: Valid email format
- **Password**: Minimum 8 characters with uppercase, lowercase, number, and special character
- **Phone**: Pakistani format (92XXXXXXXXXX)
- **Student ID**: Format validation (XX22-XXX-XXX)
- **Real-time validation**: Immediate feedback on field blur
- **Form submission**: Validates all fields before submission

## JavaScript Utilities

### validation.js
- Form validation functions
- Real-time validation setup
- Error message display

### auth.js
- Session management
- Login/Signup handling
- Role-based redirects

### cart.js
- Shopping cart management
- Cart persistence in localStorage
- Cart UI updates

### api.js
- API client for backend communication
- Organized API endpoints by module

### recommendations.js
- AI-based recommendation engine
- Popular items fallback
- Recommendation rendering

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Development Notes

- Uses localStorage for session and cart management
- All API calls include error handling and fallbacks
- Responsive design for mobile and desktop
- Font Awesome icons for UI elements

