/**
 * Protected Route Component
 * Wraps routes that require authentication
 * Redirects to login if not authenticated
 * Optionally restricts access by role
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../config/constants';
import Loading from '../common/Loading';

export const ProtectedRoute = ({ children, allowedRoles = null }) => {
    const { user, loading, isAuthenticated } = useAuth();

    // Show loading while checking authentication
    if (loading) {
        return <Loading message="Checking authentication..." />;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    // Check role-based access
    if (allowedRoles && user) {
        const hasAccess = Array.isArray(allowedRoles)
            ? allowedRoles.includes(user.role)
            : user.role === allowedRoles;

        if (!hasAccess) {
            // Redirect to appropriate dashboard based on user role
            const dashboardRoutes = {
                admin: ROUTES.ADMIN_DASHBOARD,
                manager: ROUTES.MANAGER_DASHBOARD,
                user: ROUTES.USER_DASHBOARD,
            };

            return <Navigate to={dashboardRoutes[user.role] || ROUTES.HOME} replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
