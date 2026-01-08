/**
 * Public API Service
 * Integrates with JSONPlaceholder API for user data
 */

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch all users from the public API
 */
export const fetchUsersFromAPI = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();

        // Transform API data to match our application's user structure
        return users.map(user => ({
            id: user.id.toString(),
            firstName: user.name.split(' ')[0],
            lastName: user.name.split(' ').slice(1).join(' ') || user.username,
            email: user.email,
            phone: user.phone,
            role: assignRandomRole(), // Assign random roles for demo
            status: 'active',
            avatar: '',
            city: user.address.city,
            company: user.company.name,
            website: user.website,
            createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
            lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        }));
    } catch (error) {
        console.error('Error fetching users from API:', error);
        throw error;
    }
};

/**
 * Assign random role for demo purposes
 */
function assignRandomRole() {
    const roles = ['admin', 'manager', 'viewer'];
    const weights = [0.1, 0.3, 0.6]; // 10% admin, 30% manager, 60% viewer

    const random = Math.random();
    let sum = 0;

    for (let i = 0; i < weights.length; i++) {
        sum += weights[i];
        if (random < sum) return roles[i];
    }

    return 'viewer';
}

/**
 * Create new user (simulated - JSONPlaceholder returns fake ID)
 */
export const createUserViaAPI = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            body: JSON.stringify({
                name: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                phone: userData.phone,
                address: {
                    city: userData.city || '',
                },
                company: {
                    name: userData.company || '',
                },
                website: userData.website || '',
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Return the created user with our structure
        return {
            ...userData,
            id: result.id.toString(),
            createdAt: new Date().toISOString(),
            lastLogin: null,
        };
    } catch (error) {
        console.error('Error creating user via API:', error);
        throw error;
    }
};

/**
 * Update user (simulated)
 */
export const updateUserViaAPI = async (id, userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                phone: userData.phone,
                address: {
                    city: userData.city || '',
                },
                company: {
                    name: userData.company || '',
                },
                website: userData.website || '',
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return userData;
    } catch (error) {
        console.error('Error updating user via API:', error);
        throw error;
    }
};

/**
 * Delete user (simulated)
 */
export const deleteUserViaAPI = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { success: true };
    } catch (error) {
        console.error('Error deleting user via API:', error);
        throw error;
    }
};

export default {
    fetchUsersFromAPI,
    createUserViaAPI,
    updateUserViaAPI,
    deleteUserViaAPI,
};
