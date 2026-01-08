/**
 * Mock data for development and testing
 */

import { USER_ROLES, USER_STATUS } from '../config/constants';

// Demo Users (credentials for testing)
export const DEMO_USERS = [
    {
        id: '1',
        email: 'admin@example.com',
        password: 'Admin@123',
        firstName: 'Admin',
        lastName: 'User',
        role: USER_ROLES.ADMIN,
        phone: '(555) 123-4567',
        status: USER_STATUS.ACTIVE,
        avatar: '',
        city: 'New York',
        company: 'Tech Corp',
        website: 'www.techcorp.com',
        createdAt: '2024-01-15T10:00:00Z',
        lastLogin: '2026-01-08T09:30:00Z',
    },
    {
        id: '2',
        email: 'manager@example.com',
        password: 'Manager@123',
        firstName: 'Manager',
        lastName: 'Smith',
        role: USER_ROLES.MANAGER,
        phone: '(555) 234-5678',
        status: USER_STATUS.ACTIVE,
        avatar: '',
        city: 'Los Angeles',
        company: 'Business Inc',
        website: 'www.businessinc.com',
        createdAt: '2024-02-20T10:00:00Z',
        lastLogin: '2026-01-08T08:15:00Z',
    },
    {
        id: '3',
        email: 'viewer@example.com',
        password: 'Viewer@123',
        firstName: 'John',
        lastName: 'Doe',
        role: USER_ROLES.VIEWER,
        phone: '(555) 345-6789',
        status: USER_STATUS.ACTIVE,
        avatar: '',
        city: 'Chicago',
        company: 'View Co',
        website: 'www.viewco.com',
        createdAt: '2024-03-10T10:00:00Z',
        lastLogin: '2026-01-07T16:45:00Z',
    },
];

// Additional mock users for user management
export const MOCK_USERS = [
    ...DEMO_USERS,
    {
        id: '4',
        email: 'sarah.johnson@example.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: USER_ROLES.MANAGER,
        phone: '(555) 456-7890',
        status: USER_STATUS.ACTIVE,
        avatar: '',
        createdAt: '2024-04-05T10:00:00Z',
        lastLogin: '2026-01-08T07:20:00Z',
    },
    {
        id: '5',
        email: 'michael.brown@example.com',
        firstName: 'Michael',
        lastName: 'Brown',
        role: USER_ROLES.USER,
        phone: '(555) 567-8901',
        status: USER_STATUS.ACTIVE,
        avatar: '',
        createdAt: '2024-05-12T10:00:00Z',
        lastLogin: '2026-01-07T14:30:00Z',
    },
    {
        id: '6',
        email: 'emma.davis@example.com',
        firstName: 'Emma',
        lastName: 'Davis',
        role: USER_ROLES.USER,
        phone: '(555) 678-9012',
        status: USER_STATUS.ACTIVE,
        avatar: '',
        createdAt: '2024-06-18T10:00:00Z',
        lastLogin: '2026-01-08T06:10:00Z',
    },
    {
        id: '7',
        email: 'james.wilson@example.com',
        firstName: 'James',
        lastName: 'Wilson',
        role: USER_ROLES.MANAGER,
        phone: '(555) 789-0123',
        status: USER_STATUS.ACTIVE,
        avatar: '',
        createdAt: '2024-07-22T10:00:00Z',
        lastLogin: '2026-01-06T15:00:00Z',
    },
    {
        id: '8',
        email: 'olivia.martinez@example.com',
        firstName: 'Olivia',
        lastName: 'Martinez',
        role: USER_ROLES.USER,
        phone: '(555) 890-1234',
        status: USER_STATUS.INACTIVE,
        avatar: '',
        createdAt: '2024-08-30T10:00:00Z',
        lastLogin: '2025-12-20T10:00:00Z',
    },
    {
        id: '9',
        email: 'william.taylor@example.com',
        firstName: 'William',
        lastName: 'Taylor',
        role: USER_ROLES.USER,
        phone: '(555) 901-2345',
        status: USER_STATUS.ACTIVE,
        avatar: '',
        createdAt: '2024-09-14T10:00:00Z',
        lastLogin: '2026-01-08T05:30:00Z',
    },
    {
        id: '10',
        email: 'sophia.anderson@example.com',
        firstName: 'Sophia',
        lastName: 'Anderson',
        role: USER_ROLES.USER,
        phone: '(555) 012-3456',
        status: USER_STATUS.ACTIVE,
        avatar: '',
        createdAt: '2024-10-25T10:00:00Z',
        lastLogin: '2026-01-07T18:20:00Z',
    },
    {
        id: '11',
        email: 'liam.thomas@example.com',
        firstName: 'Liam',
        lastName: 'Thomas',
        role: USER_ROLES.MANAGER,
        phone: '(555) 123-4560',
        status: USER_STATUS.ACTIVE,
        avatar: '',
        createdAt: '2024-11-08T10:00:00Z',
        lastLogin: '2026-01-08T04:15:00Z',
    },
    {
        id: '12',
        email: 'ava.jackson@example.com',
        firstName: 'Ava',
        lastName: 'Jackson',
        role: USER_ROLES.USER,
        phone: '(555) 234-5601',
        status: USER_STATUS.INACTIVE,
        avatar: '',
        createdAt: '2024-12-03T10:00:00Z',
        lastLogin: '2025-12-28T10:00:00Z',
    },
];

// Dashboard Statistics
export const getDashboardStats = (role) => {
    if (role === USER_ROLES.ADMIN) {
        return {
            totalUsers: MOCK_USERS.length,
            activeUsers: MOCK_USERS.filter(u => u.status === USER_STATUS.ACTIVE).length,
            totalAdmins: MOCK_USERS.filter(u => u.role === USER_ROLES.ADMIN).length,
            totalManagers: MOCK_USERS.filter(u => u.role === USER_ROLES.MANAGER).length,
            totalRegularUsers: MOCK_USERS.filter(u => u.role === USER_ROLES.USER).length,
            newUsersThisMonth: 3,
            userGrowth: 12.5,
        };
    }

    if (role === USER_ROLES.MANAGER) {
        return {
            teamMembers: 8,
            activeProjects: 5,
            completedTasks: 24,
            pendingTasks: 12,
            teamPerformance: 87.5,
            taskCompletionRate: 66.7,
        };
    }

    // USER role
    return {
        tasksCompleted: 15,
        tasksInProgress: 4,
        tasksPending: 8,
        totalPoints: 1250,
        level: 5,
        achievements: 12,
    };
};

// Recent Activities
export const getRecentActivities = (role) => {
    const baseActivities = [
        {
            id: '1',
            type: 'user_login',
            user: 'Sarah Johnson',
            description: 'Logged in to the system',
            timestamp: '2026-01-08T09:30:00Z',
        },
        {
            id: '2',
            type: 'user_created',
            user: 'Admin User',
            description: 'Created new user: Michael Brown',
            timestamp: '2026-01-08T08:15:00Z',
        },
        {
            id: '3',
            type: 'user_updated',
            user: 'Emma Davis',
            description: 'Updated profile information',
            timestamp: '2026-01-08T07:45:00Z',
        },
        {
            id: '4',
            type: 'password_changed',
            user: 'John Doe',
            description: 'Changed password',
            timestamp: '2026-01-07T16:20:00Z',
        },
        {
            id: '5',
            type: 'user_deleted',
            user: 'Admin User',
            description: 'Deleted user: Test User',
            timestamp: '2026-01-07T14:10:00Z',
        },
    ];

    if (role === USER_ROLES.ADMIN) {
        return baseActivities;
    }

    if (role === USER_ROLES.MANAGER) {
        return [
            {
                id: '1',
                type: 'task_completed',
                user: 'Team Member',
                description: 'Completed project milestone',
                timestamp: '2026-01-08T09:00:00Z',
            },
            {
                id: '2',
                type: 'task_assigned',
                user: 'Manager Smith',
                description: 'Assigned task to team member',
                timestamp: '2026-01-08T08:30:00Z',
            },
            {
                id: '3',
                type: 'meeting_scheduled',
                user: 'Manager Smith',
                description: 'Scheduled team meeting',
                timestamp: '2026-01-07T15:00:00Z',
            },
        ];
    }

    // USER role
    return [
        {
            id: '1',
            type: 'task_completed',
            user: 'You',
            description: 'Completed assigned task',
            timestamp: '2026-01-08T10:00:00Z',
        },
        {
            id: '2',
            type: 'task_assigned',
            user: 'Manager',
            description: 'New task assigned to you',
            timestamp: '2026-01-07T14:00:00Z',
        },
        {
            id: '3',
            type: 'achievement',
            user: 'You',
            description: 'Earned new achievement badge',
            timestamp: '2026-01-06T16:30:00Z',
        },
    ];
};

// Chart Data for Admin Dashboard
export const getUserGrowthData = () => {
    return [
        { month: 'Jul', users: 45 },
        { month: 'Aug', users: 52 },
        { month: 'Sep', users: 61 },
        { month: 'Oct', users: 73 },
        { month: 'Nov', users: 88 },
        { month: 'Dec', users: 95 },
        { month: 'Jan', users: 107 },
    ];
};

export const getRoleDistributionData = () => {
    return [
        { role: 'Admin', count: MOCK_USERS.filter(u => u.role === USER_ROLES.ADMIN).length },
        { role: 'Manager', count: MOCK_USERS.filter(u => u.role === USER_ROLES.MANAGER).length },
        { role: 'User', count: MOCK_USERS.filter(u => u.role === USER_ROLES.USER).length },
    ];
};

export default {
    DEMO_USERS,
    MOCK_USERS,
    getDashboardStats,
    getRecentActivities,
    getUserGrowthData,
    getRoleDistributionData,
};
