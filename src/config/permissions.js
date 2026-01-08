/**
 * Role-based Permissions Configuration
 * Defines what actions each role can perform
 */

import { USER_ROLES } from './constants';

// Permission types
export const PERMISSIONS = {
    VIEW_USERS: 'view_users',
    ADD_USER: 'add_user',
    EDIT_USER: 'edit_user',
    DELETE_USER: 'delete_user',
};

// Role permissions matrix
export const ROLE_PERMISSIONS = {
    [USER_ROLES.ADMIN]: {
        [PERMISSIONS.VIEW_USERS]: true,
        [PERMISSIONS.ADD_USER]: true,
        [PERMISSIONS.EDIT_USER]: true,
        [PERMISSIONS.DELETE_USER]: true,
    },
    [USER_ROLES.MANAGER]: {
        [PERMISSIONS.VIEW_USERS]: true,
        [PERMISSIONS.ADD_USER]: true,
        [PERMISSIONS.EDIT_USER]: true,
        [PERMISSIONS.DELETE_USER]: false,
    },
    [USER_ROLES.VIEWER]: {
        [PERMISSIONS.VIEW_USERS]: true,
        [PERMISSIONS.ADD_USER]: false,
        [PERMISSIONS.EDIT_USER]: false,
        [PERMISSIONS.DELETE_USER]: false,
    },
};

/**
 * Check if a role has a specific permission
 */
export const hasPermission = (role, permission) => {
    return ROLE_PERMISSIONS[role]?.[permission] || false;
};

/**
 * Check if a role can manage users (view user management page)
 */
export const canAccessUserManagement = (role) => {
    return hasPermission(role, PERMISSIONS.VIEW_USERS);
};

/**
 * Check if a role can modify users (add or edit)
 */
export const canModifyUsers = (role) => {
    return hasPermission(role, PERMISSIONS.ADD_USER) || hasPermission(role, PERMISSIONS.EDIT_USER);
};

export default {
    PERMISSIONS,
    ROLE_PERMISSIONS,
    hasPermission,
    canAccessUserManagement,
    canModifyUsers,
};
