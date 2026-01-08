/**
 * Sidebar Navigation Component
 * Role-based navigation menu
 */

import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Box,
    Typography,
    Divider,
    Chip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES, ROUTES, ROLE_LABELS } from '../../config/constants';

const DRAWER_WIDTH = 240;

// Define navigation items based on role
const getNavigationItems = (role) => {
    const commonItems = [
        {
            text: 'Profile',
            icon: <AccountCircleIcon />,
            path: ROUTES.PROFILE,
            roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.VIEWER],
        },
    ];

    if (role === USER_ROLES.ADMIN) {
        return [
            {
                text: 'Dashboard',
                icon: <DashboardIcon />,
                path: ROUTES.ADMIN_DASHBOARD,
                roles: [USER_ROLES.ADMIN],
            },
            {
                text: 'User Management',
                icon: <PeopleIcon />,
                path: ROUTES.USERS,
                roles: [USER_ROLES.ADMIN],
            },
            ...commonItems,
        ];
    }

    if (role === USER_ROLES.MANAGER) {
        return [
            {
                text: 'Dashboard',
                icon: <DashboardIcon />,
                path: ROUTES.MANAGER_DASHBOARD,
                roles: [USER_ROLES.MANAGER],
            },
            {
                text: 'User Management',
                icon: <PeopleIcon />,
                path: ROUTES.USERS,
                roles: [USER_ROLES.MANAGER],
            },
            ...commonItems,
        ];
    }

    // VIEWER role
    return [
        {
            text: 'Dashboard',
            icon: <DashboardIcon />,
            path: ROUTES.VIEWER_DASHBOARD,
            roles: [USER_ROLES.VIEWER],
        },
        {
            text: 'User Management',
            icon: <PeopleIcon />,
            path: ROUTES.USERS,
            roles: [USER_ROLES.VIEWER],
        },
        ...commonItems,
    ];
};

export const Sidebar = ({ mobileOpen, onMobileClose, window }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const navigationItems = user ? getNavigationItems(user.role) : [];

    const handleNavigation = (path) => {
        navigate(path);
        onMobileClose();
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DashboardIcon color="primary" sx={{ fontSize: 32 }} />
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
                        UserHub
                    </Typography>
                </Box>
            </Toolbar>
            <Divider />

            {/* User Role Badge */}
            {user && (
                <Box sx={{ px: 2, py: 2 }}>
                    <Chip
                        label={ROLE_LABELS[user.role]}
                        color="primary"
                        size="small"
                        sx={{ width: '100%' }}
                    />
                </Box>
            )}

            {/* Navigation Items */}
            <List sx={{ flex: 1, px: 1 }}>
                {navigationItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => handleNavigation(item.path)}
                                selected={isActive}
                                sx={{
                                    borderRadius: 2,
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'primary.contrastText',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: isActive ? 'inherit' : 'text.secondary',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 400,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* Footer */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="caption" color="text.secondary">
                    © 2024 UserHub
                </Typography>
            </Box>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            aria-label="navigation"
        >
            {/* Mobile drawer */}
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={onMobileClose}
                ModalProps={{
                    keepMounted: true, // Better mobile performance
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: DRAWER_WIDTH,
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: DRAWER_WIDTH,
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
