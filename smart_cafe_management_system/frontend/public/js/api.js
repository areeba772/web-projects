/**
 * API Client Utilities
 * Smart Cafe Management System
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * API Client Class
 */
class APIClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }
  
  /**
   * Get auth headers
   */
  getAuthHeaders() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (user.token) {
      headers['Authorization'] = `Bearer ${user.token}`;
    }
    
    return headers;
  }
  
  /**
   * Make API request
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers
      }
    };
    
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
  
  /**
   * GET request
   */
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }
  
  /**
   * POST request
   */
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  
  /**
   * PUT request
   */
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
  
  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Create API client instance
const api = new APIClient();

/**
 * Auth API
 */
const AuthAPI = {
  async login(email, password) {
    return api.post('/auth/login', { email, password });
  },
  
  async signup(userData) {
    return api.post('/auth/signup', userData);
  },
  
  async logout() {
    return api.post('/auth/logout', {});
  }
};

/**
 * User API
 */
const UserAPI = {
  async getProfile() {
    return api.get('/user/profile');
  },
  
  async updateProfile(profileData) {
    return api.put('/user/profile', profileData);
  },
  
  async getOrderHistory() {
    return api.get('/user/orders');
  },
  
  async placeOrder(orderData) {
    return api.post('/user/orders', orderData);
  }
};

/**
 * Admin API
 */
const AdminAPI = {
  async getDashboard() {
    return api.get('/admin/dashboard');
  },
  
  async getUsers() {
    return api.get('/admin/users');
  },
  
  async getCafes() {
    return api.get('/admin/cafes');
  },
  
  async createCafe(cafeData) {
    return api.post('/admin/cafes', cafeData);
  },
  
  async updateCafe(cafeId, cafeData) {
    return api.put(`/admin/cafes/${cafeId}`, cafeData);
  },
  
  async deleteCafe(cafeId) {
    return api.delete(`/admin/cafes/${cafeId}`);
  },
  
  async getMenus(cafeId) {
    return api.get(`/admin/cafes/${cafeId}/menus`);
  },
  
  async createMenu(cafeId, menuData) {
    return api.post(`/admin/cafes/${cafeId}/menus`, menuData);
  },
  
  async updateMenu(cafeId, menuId, menuData) {
    return api.put(`/admin/cafes/${cafeId}/menus/${menuId}`, menuData);
  },
  
  async deleteMenu(cafeId, menuId) {
    return api.delete(`/admin/cafes/${cafeId}/menus/${menuId}`);
  },
  
  async getOrders() {
    return api.get('/admin/orders');
  },
  
  async updateOrderStatus(orderId, status) {
    return api.put(`/admin/orders/${orderId}`, { status });
  }
};

/**
 * Food Authority API
 */
const FoodAuthorityAPI = {
  async getDashboard() {
    return api.get('/food-authority/dashboard');
  },
  
  async getCafes() {
    return api.get('/food-authority/cafes');
  },
  
  async getCafeRates(cafeId) {
    return api.get(`/food-authority/cafes/${cafeId}/rates`);
  },
  
  async sendNotification(notificationData) {
    return api.post('/food-authority/notifications', notificationData);
  },
  
  async getNotifications() {
    return api.get('/food-authority/notifications');
  }
};

/**
 * Menu API
 */
const MenuAPI = {
  async getCafes() {
    return api.get('/menu/cafes');
  },
  
  async getMenuItems(cafeId) {
    return api.get(`/menu/cafes/${cafeId}/items`);
  },
  
  async getRecommendations(userId) {
    return api.get(`/menu/recommendations/${userId}`);
  }
};

