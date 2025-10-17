/**
 * ====================================================
 * EXAMPLE: HOW TO USE ERROR HANDLING IN A REACT COMPONENT
 * ====================================================
 * 
 * This is a simple example showing how to use our error
 * handling utilities. Copy this pattern for your own forms!
 */

import React, { useState } from 'react';
import { 
  handleError, 
  handleApiError, 
  validateForm, 
  showSuccess, 
  showWarning,
  LoadingManager 
} from '../utils/errorHandler';

const ExampleFormWithErrorHandling = () => {
  // State to hold form data (what the user types)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  // State to hold any error messages for each field
  const [fieldErrors, setFieldErrors] = useState({});
  
  // State to track if we're currently submitting the form
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * This function runs when user types in any input field
   * It updates our form data with the new value
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update the form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear any existing error for this field when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * This function runs when user submits the form
   * It validates the data and either shows errors or saves it
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the form from refreshing the page
    
    try {
      // Step 1: Validate the form data
      const validation = validateForm(formData, {
        name: 'required',
        email: { required: true, email: true },
        password: { required: true, minLength: 6 }
      });
      
      // If validation failed, show the errors
      if (!validation.isValid) {
        setFieldErrors(validation.errors);
        showWarning('Please fix the errors below');
        return; // Stop here, don't submit
      }
      
      // Step 2: Clear any old errors
      setFieldErrors({});
      setIsSubmitting(true);
      
      // Step 3: Show loading message
      LoadingManager.show('Saving your information...');
      
      // Step 4: Try to save the data (simulate API call)
      await saveDataToServer(formData);
      
      // Step 5: Success! Show happy message
      LoadingManager.success('Your information was saved successfully!');
      
      // Step 6: Clear the form
      setFormData({ name: '', email: '', password: '' });
      
    } catch (error) {
      // Something went wrong! Handle it nicely
      LoadingManager.error('Could not save your information');
      handleApiError(error, 'saving your information');
      
    } finally {
      // Always do this, whether it worked or failed
      setIsSubmitting(false);
    }
  };

  /**
   * Simulate saving data to server
   * In real life, this would be an actual API call
   */
  const saveDataToServer = async (data) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random failures for demonstration
    if (Math.random() > 0.7) {
      throw new Error('Server error');
    }
    
    // If we get here, it worked!
    return { success: true };
  };

  return (
    <div className="example-form-container">
      <div className="form-card">
        <h2>Example Form with Error Handling</h2>
        <p>This shows how to use our error handling utilities!</p>
        
        <form onSubmit={handleSubmit} className="example-form">
          {/* Name Field */}
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${fieldErrors.name ? 'error' : ''}`}
              placeholder="Enter your full name"
            />
            {fieldErrors.name && (
              <div className="form-error">{fieldErrors.name}</div>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${fieldErrors.email ? 'error' : ''}`}
              placeholder="Enter your email address"
            />
            {fieldErrors.email && (
              <div className="form-error">{fieldErrors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`form-input ${fieldErrors.password ? 'error' : ''}`}
              placeholder="Enter a secure password"
            />
            {fieldErrors.password && (
              <div className="form-error">{fieldErrors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`btn-primary ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner rotate"></span>
                Saving...
              </>
            ) : (
              'Save Information'
            )}
          </button>
        </form>

        {/* Help Text */}
        <div className="help-text">
          <h4>Try these things:</h4>
          <ul>
            <li>Submit the form empty to see validation errors</li>
            <li>Enter an invalid email to see email validation</li>
            <li>Use a short password to see length validation</li>
            <li>Submit valid data to see success/error messages</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExampleFormWithErrorHandling;