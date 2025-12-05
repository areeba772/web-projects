/**
 * AI-Based Recommendation System
 * Smart Cafe Management System
 */

// Import API_BASE_URL from api.js if available
const API_BASE_URL = typeof window !== 'undefined' && window.API_BASE_URL 
  ? window.API_BASE_URL 
  : 'http://localhost:5000/api';

const RecommendationEngine = {
  /**
   * Get recommendations for a user
   */
  async getRecommendations(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/recommendations/${userId}`);
      const data = await response.json();
      
      if (data.success && data.recommendations) {
        return data.recommendations;
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
    
    // Fallback: Return popular items
    return this.getPopularItems();
  },
  
  /**
   * Get popular items (fallback)
   */
  getPopularItems() {
    return [
      { id: '1', name: 'Zinger Burger', price: 350, image: '../../../public/images/burger.jpg', description: 'Crispy chicken fillet with fresh lettuce and special sauce.' },
      { id: '2', name: 'Chicken Tikka Pizza', price: 950, image: '../../../public/images/pizza.jpg', description: 'Spicy chicken tikka, onions, and capsicum on a thin crust.' },
      { id: '3', name: 'Chicken Biryani', price: 500, image: '../../../public/images/biryani.jpg', description: 'Aromatic basmati rice with tender chicken pieces and spices.' }
    ];
  },
  
  /**
   * Get recommendations based on user order history
   */
  getRecommendationsFromHistory(orderHistory) {
    if (!orderHistory || orderHistory.length === 0) {
      return this.getPopularItems();
    }
    
    // Count item frequencies
    const itemCounts = {};
    orderHistory.forEach(order => {
      if (order.items) {
        order.items.forEach(item => {
          const itemName = item.name;
          if (!itemCounts[itemName]) {
            itemCounts[itemName] = 0;
          }
          itemCounts[itemName] += item.quantity || 1;
        });
      }
    });
    
    // Sort by frequency and return top items
    const sortedItems = Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => {
        // Match with available menu items
        return this.findMenuItemByName(name);
      })
      .filter(item => item !== null);
    
    return sortedItems.length > 0 ? sortedItems : this.getPopularItems();
  },
  
  /**
   * Find menu item by name
   */
  findMenuItemByName(name) {
    // This would typically fetch from API
    const menuItems = [
      { id: '1', name: 'Zinger Burger', price: 350, image: '../../../public/images/burger.jpg' },
      { id: '2', name: 'Chicken Tikka Pizza', price: 950, image: '../../../public/images/pizza.jpg' },
      { id: '3', name: 'Chicken Biryani', price: 500, image: '../../../public/images/biryani.jpg' },
      { id: '4', name: 'Cappuccino', price: 250, image: '../../../public/images/coffee.jpg' },
      { id: '5', name: 'Club Sandwich', price: 300, image: '../../../public/images/sandwich.jpg' }
    ];
    
    return menuItems.find(item => 
      item.name.toLowerCase().includes(name.toLowerCase()) || 
      name.toLowerCase().includes(item.name.toLowerCase())
    ) || null;
  },
  
  /**
   * Render recommendations in the UI
   */
  renderRecommendations(containerId, recommendations) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!recommendations || recommendations.length === 0) {
      recommendations = this.getPopularItems();
    }
    
    container.innerHTML = recommendations.map(item => {
      const itemId = item.id || Math.random().toString(36).substr(2, 9);
      const itemPrice = item.price || 0;
      const itemName = item.name || 'Item';
      const itemImage = item.image || item.image_url || '../../../public/images/burger.jpg';
      const itemDesc = item.description || 'Delicious item recommended for you!';
      
      // Escape quotes for onclick handler
      const safeItemName = itemName.replace(/'/g, "\\'");
      const safeItemImage = itemImage.replace(/'/g, "\\'");
      
      return `
        <div class="recommendation-item-card">
          <img src="${itemImage}" alt="${itemName}" />
          <div class="recommendation-item-card-content">
            <h4>${itemName}</h4>
            <p>${itemDesc}</p>
            <span class="price">Rs. ${itemPrice}</span>
            <button class="add-btn" onclick="addToCart({id: '${itemId}', name: '${safeItemName}', price: ${itemPrice}, image: '${safeItemImage}'})" style="margin-top: 10px; cursor: pointer;">
              Add to Cart
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
};

/**
 * Initialize recommendations on page load
 */
async function initRecommendations(containerId) {
  const user = SessionManager && SessionManager.getUser ? SessionManager.getUser() : null;
  if (!user || !user.id) {
    // Show popular items for non-logged-in users
    RecommendationEngine.renderRecommendations(containerId, RecommendationEngine.getPopularItems());
    return;
  }
  
  // Get recommendations from API
  const recommendations = await RecommendationEngine.getRecommendations(user.id);
  RecommendationEngine.renderRecommendations(containerId, recommendations);
}

