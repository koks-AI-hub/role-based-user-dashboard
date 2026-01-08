/**
 * Form validation utility functions
 */

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '../config/constants';

/**
 * Validate email format
 */
export const validateEmail = (email) => {
    if (!email) {
        return 'Email is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }

    return '';
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
    if (!password) {
        return 'Password is required';
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
        return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    }

    if (!PASSWORD_REGEX.test(password)) {
        return 'Password must contain uppercase, lowercase, number, and special character';
    }

    return '';
};

/**
 * Validate password confirmation
 */
export const validatePasswordConfirm = (password, confirmPassword) => {
    if (!confirmPassword) {
        return 'Please confirm your password';
    }

    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }

    return '';
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
        return `${fieldName} is required`;
    }
    return '';
};

/**
 * Validate name (first name, last name)
 */
export const validateName = (name, fieldName = 'Name') => {
    const requiredError = validateRequired(name, fieldName);
    if (requiredError) return requiredError;

    if (name.length < 2) {
        return `${fieldName} must be at least 2 characters`;
    }

    if (name.length > 50) {
        return `${fieldName} must not exceed 50 characters`;
    }

    return '';
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
    if (!phone) return ''; // Phone is optional

    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (!phoneRegex.test(phone)) {
        return 'Please enter a valid phone number';
    }

    return '';
};

/**
 * Get password strength
 * Returns: weak, medium, strong
 */
export const getPasswordStrength = (password) => {
    if (!password) return 'weak';

    let strength = 0;

    // Length
    if (password.length >= PASSWORD_MIN_LENGTH) strength += 1;
    if (password.length >= 12) strength += 1;

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;

    // Contains numbers
    if (/\d/.test(password)) strength += 1;

    // Contains special characters
    if (/[@$!%*?&]/.test(password)) strength += 1;

    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
};

/**
 * Validate login form
 */
export const validateLoginForm = (email, password) => {
    const errors = {};

    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordError = validateRequired(password, 'Password');
    if (passwordError) errors.password = passwordError;

    return errors;
};

/**
 * Validate signup form
 */
export const validateSignupForm = (formData) => {
    const errors = {};

    const firstNameError = validateName(formData.firstName, 'First name');
    if (firstNameError) errors.firstName = firstNameError;

    const lastNameError = validateName(formData.lastName, 'Last name');
    if (lastNameError) errors.lastName = lastNameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    const confirmPasswordError = validatePasswordConfirm(
        formData.password,
        formData.confirmPassword
    );
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    if (!formData.acceptTerms) {
        errors.acceptTerms = 'You must accept the terms and conditions';
    }

    return errors;
};

/**
 * Validate user form (for user management)
 */
export const validateUserForm = (formData) => {
    const errors = {};

    const firstNameError = validateName(formData.firstName, 'First name');
    if (firstNameError) errors.firstName = firstNameError;

    const lastNameError = validateName(formData.lastName, 'Last name');
    if (lastNameError) errors.lastName = lastNameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const roleError = validateRequired(formData.role, 'Role');
    if (roleError) errors.role = roleError;

    // Password is optional when editing existing user
    if (formData.password) {
        const passwordError = validatePassword(formData.password);
        if (passwordError) errors.password = passwordError;
    }

    const phoneError = validatePhone(formData.phone);
    if (phoneError) errors.phone = phoneError;

    return errors;
};
