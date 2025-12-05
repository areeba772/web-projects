/**
 * Shopping Cart Management
 * Smart Cafe Management System
 */

const CartManager = {
  /**
   * Get cart from localStorage
   */
  getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  },
  
  /**
   * Save cart to localStorage
   */
  saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  },
  
  /**
   * Add item to cart
   */
  addItem(item) {
    const cart = this.getCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
    } else {
      cart.push({
        ...item,
        quantity: item.quantity || 1
      });
    }
    
    this.saveCart(cart);
    this.updateCartUI();
    return cart;
  },
  
  /**
   * Remove item from cart
   */
  removeItem(itemId) {
    const cart = this.getCart();
    const filteredCart = cart.filter(item => item.id !== itemId);
    this.saveCart(filteredCart);
    this.updateCartUI();
    return filteredCart;
  },
  
  /**
   * Update item quantity
   */
  updateQuantity(itemId, quantity) {
    if (quantity <= 0) {
      return this.removeItem(itemId);
    }
    
    const cart = this.getCart();
    const item = cart.find(cartItem => cartItem.id === itemId);
    
    if (item) {
      item.quantity = quantity;
      this.saveCart(cart);
      this.updateCartUI();
    }
    
    return cart;
  },
  
  /**
   * Clear cart
   */
  clearCart() {
    this.saveCart([]);
    this.updateCartUI();
  },
  
  /**
   * Get cart total
   */
  getTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => {
      return total + (parseFloat(item.price) * (item.quantity || 1));
    }, 0);
  },
  
  /**
   * Get cart count
   */
  getCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => {
      return count + (item.quantity || 1);
    }, 0);
  },
  
  /**
   * Update cart UI (badge, etc.)
   */
  updateCartUI() {
    const count = this.getCount();
    const cartBadges = document.querySelectorAll('.cart-badge, [data-cart-count]');
    cartBadges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    });
  },
  
  /**
   * Render cart table
   */
  renderCartTable(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    
    const cart = this.getCart();
    
    if (cart.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">Your cart is empty</td></tr>';
      return;
    }
    
    tbody.innerHTML = cart.map(item => `
      <tr data-item-id="${item.id}">
        <td>${item.name}</td>
        <td>
          <input type="number" min="1" value="${item.quantity || 1}" 
                 onchange="CartManager.updateQuantity('${item.id}', this.value)"
                 style="width: 60px; text-align: center;">
        </td>
        <td>Rs. ${parseFloat(item.price).toFixed(2)}</td>
        <td>Rs. ${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}</td>
        <td>
          <button class="remove-btn" onclick="CartManager.removeItem('${item.id}')">
            Remove
          </button>
        </td>
      </tr>
    `).join('');
    
    // Update total
    const totalElement = document.getElementById('totalAmount');
    if (totalElement) {
      totalElement.textContent = `Total: PKR ${this.getTotal().toFixed(2)}`;
    }
  }
};

/**
 * Add to cart with validation
 */
function addToCart(item) {
  if (!item || !item.id || !item.name || !item.price) {
    console.error('Invalid item data');
    return false;
  }
  
  CartManager.addItem(item);
  
  // Show notification
  showNotification(`${item.name} added to cart!`, 'success');
  
  return true;
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification animations
if (!document.getElementById('notification-styles')) {
  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize cart UI on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    CartManager.updateCartUI();
    const cartTable = document.getElementById('cartTable');
    if (cartTable) {
      CartManager.renderCartTable('cartTable');
    }
  });
} else {
  CartManager.updateCartUI();
  const cartTable = document.getElementById('cartTable');
  if (cartTable) {
    CartManager.renderCartTable('cartTable');
  }
}

