/**
 * Authentication Context
 * Manages authentication state and user session
 */

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS, TOKEN_EXPIRY } from '../config/constants';
import * as authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Initialize auth state from localStorage
     */
    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
                const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

                if (storedToken && storedUser) {
                    // Validate token
                    if (authService.validateToken(storedToken)) {
                        setToken(storedToken);
                        setUser(JSON.parse(storedUser));
                    } else {
                        // Token expired, clear storage
                        localStorage.removeItem(STORAGE_KEYS.TOKEN);
                        localStorage.removeItem(STORAGE_KEYS.USER);
                    }
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    /**
     * Auto-logout on token expiration
     */
    useEffect(() => {
        if (!token) return;

        const decoded = authService.decodeToken(token);
        if (!decoded || !decoded.exp) return;

        const timeUntilExpiry = decoded.exp - Date.now();

        if (timeUntilExpiry > 0) {
            const timer = setTimeout(() => {
                handleLogout();
            }, timeUntilExpiry);

            return () => clearTimeout(timer);
        }
    }, [token]);

    /**
     * Login user
     */
    const login = useCallback(async (email, password, rememberMe = false) => {
        try {
            setError(null);
            setLoading(true);

            const response = await authService.login(email, password, rememberMe);

            setToken(response.token);
            setUser(response.user);

            // Persist to localStorage
            localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

            if (rememberMe) {
                localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
            }

            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Signup new user
     */
    const signup = useCallback(async (userData) => {
        try {
            setError(null);
            setLoading(true);

            const response = await authService.signup(userData);

            setToken(response.token);
            setUser(response.user);

            // Persist to localStorage
            localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Logout user
     */
    const handleLogout = useCallback(async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear state
            setUser(null);
            setToken(null);
            setError(null);

            // Clear localStorage
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER);
            localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
        }
    }, []);

    /**
     * Update user data
     */
    const updateUser = useCallback((updates) => {
        setUser(prevUser => {
            const updatedUser = { ...prevUser, ...updates };
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
            return updatedUser;
        });
    }, []);

    /**
     * Check if user has specific role
     */
    const hasRole = useCallback((role) => {
        if (!user) return false;
        if (Array.isArray(role)) {
            return role.includes(user.role);
        }
        return user.role === role;
    }, [user]);

    /**
     * Check if user is authenticated
     */
    const isAuthenticated = useCallback(() => {
        return !!user && !!token && authService.validateToken(token);
    }, [user, token]);

    const value = {
        user,
        token,
        loading,
        error,
        login,
        signup,
        logout: handleLogout,
        updateUser,
        hasRole,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
