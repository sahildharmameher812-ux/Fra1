/**
 * ====================================================
 * BEGINNER-FRIENDLY ERROR HANDLER
 * ====================================================
 * 
 * This file helps you handle errors in your React app.
 * Don't worry if you're new to programming - each function
 * has simple explanations and examples!
 */

// Import toast notifications for user-friendly messages
import { toast } from 'react-toastify';

/**
 * SIMPLE ERROR HANDLER
 * Use this when something goes wrong and you want to show a nice message
 * 
 * @param {Error} error - The error that happened
 * @param {string} userMessage - Simple message to show the user
 * 
 * Example usage:
 * try {
 *   // Your code here
 * } catch (error) {
 *   handleError(error, "Sorry, something went wrong!");
 * }
 */
export const handleError = (error, userMessage = "Something went wrong") => {
  // Log the technical error for developers (you won't see this normally)
  console.error('Error details:', error);
  
  // Show a friendly message to the user
  toast.error(userMessage, {
    position: "top-right",
    autoClose: 5000,  // Message disappears after 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

/**
 * API ERROR HANDLER
 * Use this when your app talks to the server and something goes wrong
 * 
 * @param {Error} error - The error from the server
 * @param {string} action - What you were trying to do
 * 
 * Example usage:
 * try {
 *   const response = await fetch('/api/data');
 * } catch (error) {
 *   handleApiError(error, "loading your data");
 * }
 */
export const handleApiError = (error, action = "processing your request") => {
  let userMessage = `Sorry, we had trouble ${action}`;
  
  // Check what kind of error happened
  if (error.response) {
    // The server responded with an error
    const status = error.response.status;
    
    if (status === 404) {
      userMessage = "Sorry, we couldn't find what you're looking for";
    } else if (status === 401) {
      userMessage = "Please log in again to continue";
    } else if (status === 403) {
      userMessage = "You don't have permission to do this";
    } else if (status >= 500) {
      userMessage = "Our servers are having issues. Please try again later";
    }
  } else if (error.request) {
    // No response from server (network issue)
    userMessage = "Please check your internet connection and try again";
  }
  
  console.error('API Error:', error);
  toast.error(userMessage);
};

/**
 * FORM VALIDATION HELPER
 * Use this to check if form data is correct before sending
 * 
 * @param {Object} formData - The data from your form
 * @param {Object} rules - Rules for what's required
 * @returns {Object} - Object with isValid (true/false) and errors
 * 
 * Example usage:
 * const validation = validateForm(
 *   { email: 'user@email.com', password: '123' },
 *   { email: 'required', password: { required: true, minLength: 6 } }
 * );
 */
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;
  
  // Check each field against its rules
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const rule = rules[field];
    
    // Check if field is required
    if (rule === 'required' || rule.required) {
      if (!value || value.trim() === '') {
        errors[field] = `${field} is required`;
        isValid = false;
        return;
      }
    }
    
    // Check minimum length
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
      isValid = false;
    }
    
    // Check if email format is valid
    if (rule.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[field] = 'Please enter a valid email address';
        isValid = false;
      }
    }
  });
  
  return { isValid, errors };
};

/**
 * SUCCESS MESSAGE HELPER
 * Use this to show happy messages when things work well!
 * 
 * @param {string} message - Happy message to show
 * 
 * Example usage:
 * showSuccess("Your data was saved successfully!");
 */
export const showSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

/**
 * INFO MESSAGE HELPER
 * Use this to show informational messages
 * 
 * @param {string} message - Info message to show
 */
export const showInfo = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

/**
 * WARNING MESSAGE HELPER
 * Use this to warn users about something important
 * 
 * @param {string} message - Warning message to show
 */
export const showWarning = (message) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 6000,  // Warnings stay longer
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

/**
 * LOADING STATE HELPER
 * Use this to show/hide loading messages
 */
export class LoadingManager {
  static toastId = null;
  
  /**
   * Show loading message
   * @param {string} message - What you're loading
   */
  static show(message = "Loading...") {
    this.toastId = toast.loading(message);
  }
  
  /**
   * Hide loading and show success
   * @param {string} message - Success message
   */
  static success(message = "Done!") {
    if (this.toastId) {
      toast.update(this.toastId, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: 3000
      });
    }
  }
  
  /**
   * Hide loading and show error
   * @param {string} message - Error message
   */
  static error(message = "Something went wrong") {
    if (this.toastId) {
      toast.update(this.toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 5000
      });
    }
  }
  
  /**
   * Just hide the loading message
   */
  static hide() {
    if (this.toastId) {
      toast.dismiss(this.toastId);
      this.toastId = null;
    }
  }
}

/**
 * ====================================================
 * HOW TO USE THESE HELPERS IN YOUR COMPONENTS
 * ====================================================
 * 
 * 1. Import what you need at the top of your component:
 *    import { handleError, showSuccess } from '../utils/errorHandler';
 * 
 * 2. Use in your functions:
 *    const saveData = async () => {
 *      try {
 *        // Your save code here
 *        await api.save(data);
 *        showSuccess("Data saved!");
 *      } catch (error) {
 *        handleError(error, "Could not save data");
 *      }
 *    };
 * 
 * 3. For forms:
 *    const validation = validateForm(formData, {
 *      name: 'required',
 *      email: { required: true, email: true }
 *    });
 *    
 *    if (!validation.isValid) {
 *      // Show errors
 *      Object.values(validation.errors).forEach(error => 
 *        showWarning(error)
 *      );
 *    }
 */

// Export everything as default for easy importing
export default {
  handleError,
  handleApiError,
  validateForm,
  showSuccess,
  showInfo,
  showWarning,
  LoadingManager
};