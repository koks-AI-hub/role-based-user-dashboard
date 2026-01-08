/**
 * Routing Configuration
 * All application routes with role-based access control
 */

import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { ROUTES, USER_ROLES } from '../config/constants';
import Loading from '../components/common/Loading';

// Lazy load pages for code splitting
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const SignupPage = lazy(() => import('../pages/auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const AdminDashboard = lazy(() => import('../pages/dashboards/AdminDashboard'));
const ManagerDashboard = lazy(() => import('../pages/dashboards/ManagerDashboard'));
const ViewerDashboard = lazy(() => import('../pages/dashboards/ViewerDashboard'));
const UserListPage = lazy(() => import('../pages/users/UserListPage'));
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'));

/**
 * Home route redirect based on authentication and role
 */
const HomeRedirect = () => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    // Redirect to role-specific dashboard
    const dashboardRoutes = {
        [USER_ROLES.ADMIN]: ROUTES.ADMIN_DASHBOARD,
        [USER_ROLES.MANAGER]: ROUTES.MANAGER_DASHBOARD,
        [USER_ROLES.VIEWER]: ROUTES.VIEWER_DASHBOARD,
    };

    return <Navigate to={dashboardRoutes[user.role] || ROUTES.LOGIN} replace />;
};

/**
 * Main App Routes
 */
export const AppRoutes = () => {
    return (
        <React.Suspense fallback={<Loading message="Loading page..." />}>
            <Routes>
                {/* Public Routes */}
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />

                {/* Protected Routes - Admin */}
                <Route
                    path={ROUTES.ADMIN_DASHBOARD}
                    element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Protected Routes - Manager */}
                <Route
                    path={ROUTES.MANAGER_DASHBOARD}
                    element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.MANAGER]}>
                            <ManagerDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Protected Routes - Viewer */}
                <Route
                    path={ROUTES.VIEWER_DASHBOARD}
                    element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.VIEWER]}>
                            <ViewerDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* User Management - All authenticated users can view */}
                <Route
                    path={ROUTES.USERS}
                    element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.VIEWER]}>
                            <UserListPage />
                        </ProtectedRoute>
                    }
                />

                {/* Protected Routes - All Authenticated Users */}
                <Route
                    path={ROUTES.PROFILE}
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                {/* Home Route */}
                <Route path={ROUTES.HOME} element={<HomeRedirect />} />

                {/* 404 Not Found - Redirect to home */}
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
        </React.Suspense>
    );
};

export default AppRoutes;
