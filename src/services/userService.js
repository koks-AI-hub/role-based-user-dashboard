/**
 * Enhanced User Management Service with API Integration
 * Supports debounced search, filtering, sorting, and optimistic updates
 */

import { fetchUsersFromAPI, createUserViaAPI, updateUserViaAPI, deleteUserViaAPI } from './apiService';
import { USER_STATUS } from '../config/constants';

/**
 * Simulate API delay
 */
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory user storage (cache of API data)
let usersCache = [];
let nextId = 1000; // Start from 1000 to avoid conflicts with API IDs

/**
 * Initialize users from API
 */
export const initializeUsers = async () => {
    try {
        const apiUsers = await fetchUsersFromAPI();
        usersCache = apiUsers;
        nextId = Math.max(...apiUsers.map(u => parseInt(u.id))) + 1;
        return apiUsers;
    } catch (error) {
        console.error('Failed to initialize users:', error);
        // Return empty array if API fails
        return [];
    }
};

/**
 * Get all users with filtering, sorting, and pagination
 */
export const getUsers = async (options = {}) => {
    await delay();

    // Initialize if cache is empty
    if (usersCache.length === 0) {
        await initializeUsers();
    }

    let filteredUsers = [...usersCache];

    // Search filter (debounced on the UI side)
    if (options.search) {
        const searchLower = options.search.toLowerCase();
        filteredUsers = filteredUsers.filter(user =>
            user.firstName.toLowerCase().includes(searchLower) ||
            user.lastName.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower) ||
            (user.city && user.city.toLowerCase().includes(searchLower)) ||
            (user.company && user.company.toLowerCase().includes(searchLower))
        );
    }

    // Role filter
    if (options.role && options.role !== 'all') {
        filteredUsers = filteredUsers.filter(user => user.role === options.role);
    }

    // Status filter
    if (options.status && options.status !== 'all') {
        filteredUsers = filteredUsers.filter(user => user.status === options.status);
    }

    // City filter
    if (options.city && options.city !== 'all') {
        filteredUsers = filteredUsers.filter(user => user.city === options.city);
    }

    // Company filter
    if (options.company && options.company !== 'all') {
        filteredUsers = filteredUsers.filter(user => user.company === options.company);
    }

    // Sort
    if (options.sortBy) {
        const { field, order = 'asc' } = options.sortBy;
        filteredUsers.sort((a, b) => {
            let aVal = a[field];
            let bVal = b[field];

            // Handle dates
            if (field === 'createdAt' || field === 'lastLogin') {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            }

            // Handle null/undefined
            if (!aVal) return order === 'asc' ? 1 : -1;
            if (!bVal) return order === 'asc' ? -1 : 1;

            // String comparison
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (aVal < bVal) return order === 'asc' ? -1 : 1;
            if (aVal > bVal) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }

    // Pagination
    const page = options.page || 0;
    const pageSize = options.pageSize || 10;
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
        data: paginatedUsers,
        total: filteredUsers.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredUsers.length / pageSize),
    };
};

/**
 * Get unique cities for filter dropdown
 */
export const getCities = () => {
    const cities = [...new Set(usersCache.map(u => u.city).filter(Boolean))];
    return cities.sort();
};

/**
 * Get unique companies for filter dropdown
 */
export const getCompanies = () => {
    const companies = [...new Set(usersCache.map(u => u.company).filter(Boolean))];
    return companies.sort();
};

/**
 * Get user by ID
 */
export const getUserById = async (id) => {
    await delay(200);

    const user = usersCache.find(u => u.id === id);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

/**
 * Create new user (optimistic update)
 */
export const createUser = async (userData) => {
    // Optimistic update
    const newUser = {
        id: nextId.toString(),
        ...userData,
        status: userData.status || USER_STATUS.ACTIVE,
        avatar: userData.avatar || '',
        createdAt: new Date().toISOString(),
        lastLogin: null,
    };

    // Add to cache immediately (optimistic)
    usersCache.push(newUser);
    nextId++;

    try {
        // Call API in background
        await createUserViaAPI(userData);
        return newUser;
    } catch (error) {
        // Rollback on error
        usersCache = usersCache.filter(u => u.id !== newUser.id);
        throw error;
    }
};

/**
 * Update user (optimistic update)
 */
export const updateUser = async (id, updates) => {
    const index = usersCache.findIndex(u => u.id === id);

    if (index === -1) {
        throw new Error('User not found');
    }

    // Store old user for rollback
    const oldUser = { ...usersCache[index] };

    // Optimistic update
    usersCache[index] = {
        ...usersCache[index],
        ...updates,
        id, // Ensure ID doesn't change
    };

    try {
        // Call API in background
        await updateUserViaAPI(id, updates);
        return usersCache[index];
    } catch (error) {
        // Rollback on error
        usersCache[index] = oldUser;
        throw error;
    }
};

/**
 * Delete user (optimistic update)
 */
export const deleteUser = async (id) => {
    const index = usersCache.findIndex(u => u.id === id);

    if (index === -1) {
        throw new Error('User not found');
    }

    // Store for rollback
    const deletedUser = usersCache[index];

    // Optimistic update
    usersCache.splice(index, 1);

    try {
        // Call API in background
        await deleteUserViaAPI(id);
        return { success: true, message: 'User deleted successfully' };
    } catch (error) {
        // Rollback on error
        usersCache.splice(index, 0, deletedUser);
        throw error;
    }
};

/**
 * Delete multiple users (optimistic update)
 */
export const deleteUsers = async (ids) => {
    const deletedIds = [];
    const errors = [];
    const deletedUsers = [];

    for (const id of ids) {
        try {
            const index = usersCache.findIndex(u => u.id === id);
            if (index !== -1) {
                deletedUsers.push({ id, user: usersCache[index], index });
                usersCache.splice(index, 1);
                deletedIds.push(id);
            } else {
                errors.push({ id, error: 'User not found' });
            }
        } catch (error) {
            errors.push({ id, error: error.message });
        }
    }

    try {
        // Call API for each delete in background
        await Promise.all(deletedIds.map(id => deleteUserViaAPI(id)));

        return {
            success: true,
            deleted: deletedIds,
            errors,
        };
    } catch (error) {
        // Rollback all on error
        deletedUsers.forEach(({ user, index }) => {
            usersCache.splice(index, 0, user);
        });
        throw error;
    }
};

/**
 * Export users to CSV format
 */
export const exportUsers = async (userIds = null) => {
    await delay();

    const usersToExport = userIds
        ? usersCache.filter(u => userIds.includes(u.id))
        : usersCache;

    // Create CSV content
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Role', 'Status', 'Phone', 'City', 'Company', 'Created At'];
    const rows = usersToExport.map(u => [
        u.id,
        u.firstName,
        u.lastName,
        u.email,
        u.role,
        u.status,
        u.phone,
        u.city || '',
        u.company || '',
        u.createdAt,
    ]);

    const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    return {
        data: csv,
        filename: `users_export_${new Date().toISOString().split('T')[0]}.csv`,
    };
};

export default {
    initializeUsers,
    getUsers,
    getCities,
    getCompanies,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    deleteUsers,
    exportUsers,
};
