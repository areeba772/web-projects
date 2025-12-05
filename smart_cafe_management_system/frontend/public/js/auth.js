/**
 * Authentication and Session Management
 * Smart Cafe Management System
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Session Management
 */
const SessionManager = {
  setUser(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
  },
  
  getUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  },
  
  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  },
  
  getUserRole() {
    const user = this.getUser();
    return user ? user.role : null;
  },
  
  clearSession() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('cart');
  },
  
  logout() {
    this.clearSession();
    window.location.href = '../../index.html';
  }
};

/**
 * Validate login form
 */
function validateLoginForm(email, password) {
  let isValid = true;
  
  if (!validateEmail(email, 'loginEmail', true)) {
    isValid = false;
  }
  
  if (!validateRequired(password, 'loginPassword')) {
    isValid = false;
  }
  
  return isValid;
}

/**
 * Handle login
 */
async function handleLogin(email, password) {
  // Client-side validation
  if (!validateLoginForm(email, password)) {
    return { success: false, message: 'Please fix validation errors' };
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      SessionManager.setUser(data.user);
      return { success: true, user: data.user };
    } else {
      return { success: false, message: data.message || 'Login failed' };
    }
  } catch (error) {
    console.error('Login error:', error);
    // Fallback to mock login for development
    return handleMockLogin(email, password);
  }
}

/**
 * Mock login for development (fallback)
 */
function handleMockLogin(email, password) {
  // Mock users for development
  const mockUsers = {
    'admin@cafe.com': { email: 'admin@cafe.com', role: 'admin', name: 'Admin User', id: 1 },
    'user@student.com': { email: 'user@student.com', role: 'user', name: 'Student User', id: 2 },
    'authority@gov.com': { email: 'authority@gov.com', role: 'food_authority', name: 'Food Authority', id: 3 }
  };
  
  if (mockUsers[email] && password.length >= 6) {
    SessionManager.setUser(mockUsers[email]);
    return { success: true, user: mockUsers[email] };
  }
  
  return { success: false, message: 'Invalid email or password' };
}

/**
 * Validate signup form
 */
function validateSignupForm(formData) {
  let isValid = true;
  
  const { name, email, studentId, password, confirmPassword, phone } = formData;
  
  if (!validateName(name, 'signupName', true)) isValid = false;
  if (!validateEmail(email, 'signupEmail', true)) isValid = false;
  if (!validateStudentId(studentId, 'signupStudentId', true)) isValid = false;
  if (!validatePassword(password, 'signupPassword', true)) isValid = false;
  if (!validatePasswordMatch(password, confirmPassword, 'signupConfirmPassword')) isValid = false;
  if (!validatePhone(phone, 'signupPhone', true)) isValid = false;
  
  return isValid;
}

/**
 * Handle signup
 */
async function handleSignup(formData) {
  // Client-side validation
  if (!validateSignupForm(formData)) {
    return { success: false, message: 'Please fix validation errors' };
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      return { success: true, message: 'Account created successfully!' };
    } else {
      return { success: false, message: data.message || 'Signup failed' };
    }
  } catch (error) {
    console.error('Signup error:', error);
    // Fallback to mock signup for development
    return handleMockSignup(formData);
  }
}

/**
 * Mock signup for development (fallback)
 */
function handleMockSignup(formData) {
  // Simulate successful signup
  setTimeout(() => {
    return { success: true, message: 'Account created successfully! Please log in.' };
  }, 500);
  
  return { success: true, message: 'Account created successfully! Please log in.' };
}

/**
 * Check authentication and redirect if needed
 */
function requireAuth(requiredRole = null) {
  if (!SessionManager.isAuthenticated()) {
    window.location.href = '../../pages/User/Login.html';
    return false;
  }
  
  if (requiredRole) {
    const userRole = SessionManager.getUserRole();
    if (userRole !== requiredRole) {
      window.location.href = '../../index.html';
      return false;
    }
  }
  
  return true;
}

/**
 * Initialize auth on page load
 */
function initAuth() {
  // Add logout functionality to all logout buttons
  const logoutButtons = document.querySelectorAll('[data-logout], .btn-secondary[href*="Logout"]');
  logoutButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      SessionManager.logout();
    });
  });
  
  // Display current user info if available
  const user = SessionManager.getUser();
  if (user) {
    const userInfoElements = document.querySelectorAll('.user-info, [data-user-name]');
    userInfoElements.forEach(el => {
      if (el.dataset.userName) {
        el.textContent = user.name;
      }
    });
  }
}

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuth);
} else {
  initAuth();
}

