/**
 * Validation utility functions for form inputs
 */

// Format email for display (lowercase and trimmed)
export const formatEmail = (email) => {
  return email.toLowerCase().trim();
};

// Validate email format using regex
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password requirements
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return errors;
};

// Check if passwords match
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};
