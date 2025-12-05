/**
 * Navigation Helper Functions
 * Smart Cafe Management System
 */

// Ensure all navigation links work properly
document.addEventListener('DOMContentLoaded', function() {
  // Fix all links with href="#"
  const allLinks = document.querySelectorAll('a[href="#"]');
  allLinks.forEach(link => {
    // Skip links that have onclick handlers
    if (!link.hasAttribute('onclick')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Link clicked but no destination set:', link.textContent);
      });
    }
  });

  // Ensure logout buttons work
  const logoutButtons = document.querySelectorAll('.btn-secondary[href*="index.html"], a[href*="index.html"][class*="logout"], a[href*="index.html"]:contains("Logout")');
  logoutButtons.forEach(button => {
    if (!button.hasAttribute('onclick')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
          if (typeof SessionManager !== 'undefined' && SessionManager.logout) {
            SessionManager.logout();
          } else {
            window.location.href = this.getAttribute('href');
          }
        }
      });
    }
  });

  // Fix all relative paths
  fixRelativePaths();
});

/**
 * Fix relative paths in navigation
 */
function fixRelativePaths() {
  const currentPath = window.location.pathname;
  const isInPages = currentPath.includes('/pages/');
  
  if (isInPages) {
    // Fix links that might have incorrect paths
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      
      // Fix links starting with ../../../index.html
      if (href === '../../../index.html' || href === '../../index.html') {
        // Determine correct path based on depth
        const depth = (currentPath.match(/\//g) || []).length;
        if (currentPath.includes('/pages/User/')) {
          link.setAttribute('href', '../../index.html');
        } else if (currentPath.includes('/pages/Admin/')) {
          link.setAttribute('href', '../../index.html');
        } else if (currentPath.includes('/pages/FoodAuthority/')) {
          link.setAttribute('href', '../../index.html');
        }
      }
    });
  }
}

/**
 * Helper to navigate to a page
 */
function navigateTo(page) {
  window.location.href = page;
}

/**
 * Helper to go back
 */
function goBack() {
  window.history.back();
}

// Export for global use
window.navigateTo = navigateTo;
window.goBack = goBack;

