/**
 * Comprehensive Form Validation Utilities
 * Smart Cafe Management System
 */

// Validation patterns
const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^92\d{10}$/,
  studentId: /^[A-Z]{2}\d{2}-[A-Z]{3}-\d{3}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  name: /^[A-Za-z\s]{2,50}$/,
  price: /^\d+(\.\d{1,2})?$/,
  positiveInteger: /^\d+$/
};

// Error messages
const ERROR_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Phone number must start with 92 and be 12 digits total (e.g., 923001234567)',
  studentId: 'Student ID must be in format: XX22-XXX-XXX (e.g., FA22-BSE-014)',
  password: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
  passwordMatch: 'Passwords do not match',
  name: 'Name must be 2-50 characters and contain only letters and spaces',
  price: 'Please enter a valid price (e.g., 100 or 99.99)',
  positiveInteger: 'Please enter a positive whole number',
  minLength: (min) => `Must be at least ${min} characters`,
  maxLength: (max) => `Must not exceed ${max} characters`,
  min: (min) => `Must be at least ${min}`,
  max: (max) => `Must not exceed ${max}`
};

/**
 * Show error message for a field
 */
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  
  // Remove existing error
  removeError(fieldId);
  
  // Add error class
  field.classList.add('error');
  
  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.id = `${fieldId}-error`;
  errorDiv.textContent = message;
  errorDiv.style.color = '#e74c3c';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '5px';
  
  // Insert error message after field
  field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

/**
 * Remove error message for a field
 */
function removeError(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  
  field.classList.remove('error');
  
  const errorDiv = document.getElementById(`${fieldId}-error`);
  if (errorDiv) {
    errorDiv.remove();
  }
}

/**
 * Clear all errors
 */
function clearAllErrors(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  const errorMessages = form.querySelectorAll('.error-message');
  errorMessages.forEach(error => error.remove());
  
  const errorFields = form.querySelectorAll('.error');
  errorFields.forEach(field => field.classList.remove('error'));
}

/**
 * Validate email
 */
function validateEmail(email, fieldId, isRequired = true) {
  if (!email || email.trim() === '') {
    if (isRequired) {
      showError(fieldId, ERROR_MESSAGES.required);
      return false;
    }
    return true;
  }
  
  if (!VALIDATION_PATTERNS.email.test(email)) {
    showError(fieldId, ERROR_MESSAGES.email);
    return false;
  }
  
  removeError(fieldId);
  return true;
}

/**
 * Validate phone number
 */
function validatePhone(phone, fieldId, isRequired = true) {
  if (!phone || phone.trim() === '') {
    if (isRequired) {
      showError(fieldId, ERROR_MESSAGES.required);
      return false;
    }
    return true;
  }
  
  // Remove spaces and dashes
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  if (!VALIDATION_PATTERNS.phone.test(cleanPhone)) {
    showError(fieldId, ERROR_MESSAGES.phone);
    return false;
  }
  
  removeError(fieldId);
  return true;
}

/**
 * Validate student ID
 */
function validateStudentId(studentId, fieldId, isRequired = true) {
  if (!studentId || studentId.trim() === '') {
    if (isRequired) {
      showError(fieldId, ERROR_MESSAGES.required);
      return false;
    }
    return true;
  }
  
  if (!VALIDATION_PATTERNS.studentId.test(studentId.trim())) {
    showError(fieldId, ERROR_MESSAGES.studentId);
    return false;
  }
  
  removeError(fieldId);
  return true;
}

/**
 * Validate password
 */
function validatePassword(password, fieldId, isRequired = true) {
  if (!password || password.trim() === '') {
    if (isRequired) {
      showError(fieldId, ERROR_MESSAGES.required);
      return false;
    }
    return true;
  }
  
  if (!VALIDATION_PATTERNS.password.test(password)) {
    showError(fieldId, ERROR_MESSAGES.password);
    return false;
  }
  
  removeError(fieldId);
  return true;
}

/**
 * Validate password confirmation
 */
function validatePasswordMatch(password, confirmPassword, confirmPasswordFieldId) {
  if (!confirmPassword || confirmPassword.trim() === '') {
    showError(confirmPasswordFieldId, ERROR_MESSAGES.required);
    return false;
  }
  
  if (password !== confirmPassword) {
    showError(confirmPasswordFieldId, ERROR_MESSAGES.passwordMatch);
    return false;
  }
  
  removeError(confirmPasswordFieldId);
  return true;
}

/**
 * Validate name
 */
function validateName(name, fieldId, isRequired = true) {
  if (!name || name.trim() === '') {
    if (isRequired) {
      showError(fieldId, ERROR_MESSAGES.required);
      return false;
    }
    return true;
  }
  
  if (!VALIDATION_PATTERNS.name.test(name.trim())) {
    showError(fieldId, ERROR_MESSAGES.name);
    return false;
  }
  
  removeError(fieldId);
  return true;
}

/**
 * Validate required field
 */
function validateRequired(value, fieldId) {
  if (!value || value.toString().trim() === '') {
    showError(fieldId, ERROR_MESSAGES.required);
    return false;
  }
  
  removeError(fieldId);
  return true;
}

/**
 * Validate price
 */
function validatePrice(price, fieldId, isRequired = true) {
  if (!price || price.toString().trim() === '') {
    if (isRequired) {
      showError(fieldId, ERROR_MESSAGES.required);
      return false;
    }
    return true;
  }
  
  if (!VALIDATION_PATTERNS.price.test(price.toString().trim())) {
    showError(fieldId, ERROR_MESSAGES.price);
    return false;
  }
  
  const priceValue = parseFloat(price);
  if (priceValue <= 0) {
    showError(fieldId, 'Price must be greater than 0');
    return false;
  }
  
  removeError(fieldId);
  return true;
}

/**
 * Validate positive integer
 */
function validatePositiveInteger(value, fieldId, isRequired = true) {
  if (!value || value.toString().trim() === '') {
    if (isRequired) {
      showError(fieldId, ERROR_MESSAGES.required);
      return false;
    }
    return true;
  }
  
  if (!VALIDATION_PATTERNS.positiveInteger.test(value.toString().trim())) {
    showError(fieldId, ERROR_MESSAGES.positiveInteger);
    return false;
  }
  
  const intValue = parseInt(value);
  if (intValue <= 0) {
    showError(fieldId, 'Value must be greater than 0');
    return false;
  }
  
  removeError(fieldId);
  return true;
}

/**
 * Validate length
 */
function validateLength(value, fieldId, min, max, isRequired = true) {
  if (!value || value.toString().trim() === '') {
    if (isRequired) {
      showError(fieldId, ERROR_MESSAGES.required);
      return false;
    }
    return true;
  }
  
  const length = value.toString().trim().length;
  
  if (min && length < min) {
    showError(fieldId, ERROR_MESSAGES.minLength(min));
    return false;
  }
  
  if (max && length > max) {
    showError(fieldId, ERROR_MESSAGES.maxLength(max));
    return false;
  }
  
  removeError(fieldId);
  return true;
}

/**
 * Real-time validation on input
 */
function setupRealTimeValidation(fieldId, validator) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  
  field.addEventListener('blur', () => {
    validator(field.value, fieldId);
  });
  
  field.addEventListener('input', () => {
    if (field.classList.contains('error')) {
      removeError(fieldId);
    }
  });
}

/**
 * Add CSS for error states
 */
function addValidationStyles() {
  if (document.getElementById('validation-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'validation-styles';
  style.textContent = `
    .error {
      border-color: #e74c3c !important;
      box-shadow: 0 0 0 0.2rem rgba(231, 76, 60, 0.25) !important;
    }
    
    .error-message {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 5px;
      display: block;
    }
    
    input.error, textarea.error, select.error {
      border-color: #e74c3c !important;
    }
  `;
  document.head.appendChild(style);
}

// Initialize validation styles when script loads
addValidationStyles();

