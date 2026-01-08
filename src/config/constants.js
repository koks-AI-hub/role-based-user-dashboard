/**
 * Application-wide constants and configuration
 */

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  VIEWER: 'viewer',
};

// Role Display Names
export const ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.MANAGER]: 'Manager',
  [USER_ROLES.VIEWER]: 'Viewer',
};

// API Endpoints (Mock)
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  SIGNUP: '/api/auth/signup',
  LOGOUT: '/api/auth/logout',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  USERS: '/api/users',
  PROFILE: '/api/profile',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  THEME_MODE: 'theme_mode',
  REMEMBER_ME: 'remember_me',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  ADMIN_DASHBOARD: '/admin/dashboard',
  MANAGER_DASHBOARD: '/manager/dashboard',
  VIEWER_DASHBOARD: '/viewer/dashboard',
  USERS: '/users',
  PROFILE: '/profile',
  NOT_FOUND: '/404',
};

// Token Expiration (in milliseconds)
export const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

// Password Requirements
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

// Notification Duration
export const NOTIFICATION_DURATION = 5000; // 5 seconds

// debounce delay for search
export const SEARCH_DEBOUNCE_DELAY = 300;

// User Status
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export default {
  USER_ROLES,
  ROLE_LABELS,
  API_ENDPOINTS,
  STORAGE_KEYS,
  ROUTES,
  TOKEN_EXPIRY,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  NOTIFICATION_DURATION,
  SEARCH_DEBOUNCE_DELAY,
  USER_STATUS,
};
