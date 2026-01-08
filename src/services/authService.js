/**
 * Authentication Service
 * Mock authentication API for development
 */

import { DEMO_USERS } from './mockData';
import { TOKEN_EXPIRY } from '../config/constants';

/**
 * Simulate API delay
 */
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate mock JWT token
 */
const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        exp: Date.now() + TOKEN_EXPIRY,
    };

    // In a real app, this would be a proper JWT
    return btoa(JSON.stringify(payload));
};

/**
 * Decode token
 */
export const decodeToken = (token) => {
    try {
        const decoded = JSON.parse(atob(token));

        // Check if token is expired
        if (decoded.exp && decoded.exp < Date.now()) {
            return null;
        }

        return decoded;
    } catch (error) {
        return null;
    }
};

/**
 * Validate token
 */
export const validateToken = (token) => {
    const decoded = decodeToken(token);
    return decoded !== null;
};

/**
 * Login user
 */
export const login = async (email, password, rememberMe = false) => {
    await delay();

    // Find user
    const user = DEMO_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
        throw new Error('Invalid email or password');
    }

    if (user.password !== password) {
        throw new Error('Invalid email or password');
    }

    // Generate token
    const token = generateToken(user);

    // Return user data without password
    const { password: _, ...userData } = user;

    return {
        token,
        user: {
            ...userData,
            lastLogin: new Date().toISOString(),
        },
        rememberMe,
    };
};

/**
 * Signup new user
 */
export const signup = async (userData) => {
    await delay();

    // Check if email already exists
    const existingUser = DEMO_USERS.find(
        u => u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (existingUser) {
        throw new Error('Email already registered');
    }

    // Create new user
    const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'user', // Default role
        phone: userData.phone || '',
        status: 'active',
        avatar: '',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
    };

    // Generate token
    const token = generateToken(newUser);

    return {
        token,
        user: newUser,
    };
};

/**
 * Logout user
 */
export const logout = async () => {
    await delay(200);
    // In a real app, might invalidate token on server
    return { success: true };
};

/**
 * Request password reset
 */
export const forgotPassword = async (email) => {
    await delay();

    // Check if user exists
    const user = DEMO_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
        // Don't reveal if user exists for security
        // But still return success
        return {
            success: true,
            message: 'If an account exists with this email, you will receive password reset instructions.'
        };
    }

    return {
        success: true,
        message: 'Password reset instructions sent to your email.',
    };
};

/**
 * Reset password (would use token in real app)
 */
export const resetPassword = async (token, newPassword) => {
    await delay();

    // In real app, would validate reset token
    return {
        success: true,
        message: 'Password reset successful.',
    };
};

/**
 * Change password for logged-in user
 */
export const changePassword = async (userId, currentPassword, newPassword) => {
    await delay();

    // Find user
    const user = DEMO_USERS.find(u => u.id === userId);

    if (!user) {
        throw new Error('User not found');
    }

    if (user.password !== currentPassword) {
        throw new Error('Current password is incorrect');
    }

    // In real app, would update password in database
    return {
        success: true,
        message: 'Password changed successfully.',
    };
};

/**
 * Get current user by token
 */
export const getCurrentUser = async (token) => {
    await delay(200);

    const decoded = decodeToken(token);

    if (!decoded) {
        throw new Error('Invalid token');
    }

    // Find user
    const user = DEMO_USERS.find(u => u.id === decoded.id);

    if (!user) {
        throw new Error('User not found');
    }

    const { password: _, ...userData } = user;
    return userData;
};

export default {
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    getCurrentUser,
    validateToken,
    decodeToken,
};
