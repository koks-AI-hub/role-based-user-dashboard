/**
 * Simplified Login Page with Role Selection
 * FRD Requirement: No email/password, just role selection
 */

import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Avatar,
    Alert,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES, ROUTES } from '../../config/constants';
import Loading from '../../components/common/Loading';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const roles = [
        {
            role: USER_ROLES.ADMIN,
            title: 'Administrator',
            description: 'Full control over users and system',
            icon: AdminPanelSettingsIcon,
            color: '#DC2626',
            permissions: ['View', 'Add', 'Edit', 'Delete'],
        },
        {
            role: USER_ROLES.MANAGER,
            title: 'Manager',
            description: 'Manage users and team operations',
            icon: ManageAccountsIcon,
            color: '#2563EB',
            permissions: ['View', 'Add', 'Edit'],
        },
        {
            role: USER_ROLES.VIEWER,
            title: 'Viewer',
            description: 'Read-only access to user data',
            icon: VisibilityIcon,
            color: '#16A34A',
            permissions: ['View'],
        },
    ];

    const handleRoleSelect = async (role) => {
        setSelectedRole(role);
        setLoading(true);

        try {
            // Create user object based on role selection
            const mockUser = {
                id: role === USER_ROLES.ADMIN ? '1' : role === USER_ROLES.MANAGER ? '2' : '3',
                firstName: role.charAt(0).toUpperCase() + role.slice(1),
                lastName: 'User',
                email: `${role}@example.com`,
                role: role,
                phone: '(555) 123-4567',
                status: 'active',
                city: 'New York',
                company: 'Demo Company',
                website: 'www.example.com',
            };

            // Use the appropriate demo password
            const passwords = {
                [USER_ROLES.ADMIN]: 'Admin@123',
                [USER_ROLES.MANAGER]: 'Manager@123',
                [USER_ROLES.VIEWER]: 'Viewer@123',
            };

            // Authenticate with actual demo credentials
            await login(mockUser.email, passwords[role], false);

            // Redirect based on role
            const dashboardRoutes = {
                [USER_ROLES.ADMIN]: ROUTES.ADMIN_DASHBOARD,
                [USER_ROLES.MANAGER]: ROUTES.MANAGER_DASHBOARD,
                [USER_ROLES.VIEWER]: ROUTES.VIEWER_DASHBOARD,
            };

            navigate(dashboardRoutes[role]);
        } catch (error) {
            console.error('Login failed:', error);
            setLoading(false);
            setSelectedRole(null);
        }
    };

    if (loading) {
        return <Loading message="Logging in..." />;
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: (theme) =>
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #F8FAFC 0%, #E0E7FF 100%)'
                        : 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            }}
        >
            <Container maxWidth="lg">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 6 },
                        borderRadius: 4,
                        background: (theme) =>
                            theme.palette.mode === 'light'
                                ? 'rgba(255, 255, 255, 0.9)'
                                : 'rgba(30, 41, 59, 0.9)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 5 }}>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                mx: 'auto',
                                mb: 2,
                                bgcolor: 'primary.main',
                            }}
                        >
                            <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />
                        </Avatar>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                            Role-Based Dashboard
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Select your role to access the application
                        </Typography>
                    </Box>

                    {/* Info Alert */}
                    <Alert severity="info" sx={{ mb: 4 }}>
                        <Typography variant="body2">
                            <strong>Demo Mode:</strong> Simply select a role below to login. No credentials required.
                        </Typography>
                    </Alert>

                    {/* Role Selection Cards */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                md: 'repeat(3, 1fr)',
                            },
                            gap: 3,
                        }}
                    >
                        {roles.map((roleData) => {
                            const Icon = roleData.icon;
                            const isSelected = selectedRole === roleData.role;

                            return (
                                <Card
                                    key={roleData.role}
                                    sx={{
                                        position: 'relative',
                                        overflow: 'visible',
                                        border: isSelected ? 2 : 1,
                                        borderColor: isSelected ? roleData.color : 'divider',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    <CardActionArea
                                        onClick={() => handleRoleSelect(roleData.role)}
                                        sx={{ p: 3 }}
                                    >
                                        <CardContent sx={{ p: 0 }}>
                                            <Box sx={{ textAlign: 'center', mb: 2 }}>
                                                <Avatar
                                                    sx={{
                                                        width: 64,
                                                        height: 64,
                                                        mx: 'auto',
                                                        mb: 2,
                                                        bgcolor: roleData.color,
                                                    }}
                                                >
                                                    <Icon sx={{ fontSize: 32 }} />
                                                </Avatar>
                                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                                    {roleData.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ mb: 2 }}
                                                >
                                                    {roleData.description}
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 0.5,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {roleData.permissions.map((perm) => (
                                                    <Box
                                                        key={perm}
                                                        sx={{
                                                            px: 1.5,
                                                            py: 0.5,
                                                            borderRadius: 1,
                                                            bgcolor: 'action.hover',
                                                            fontSize: '0.75rem',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {perm}
                                                    </Box>
                                                ))}
                                            </Box>

                                            <Button
                                                fullWidth
                                                variant="contained"
                                                sx={{
                                                    mt: 3,
                                                    bgcolor: roleData.color,
                                                    '&:hover': {
                                                        bgcolor: roleData.color,
                                                        filter: 'brightness(0.9)',
                                                    },
                                                }}
                                            >
                                                Login as {roleData.title}
                                            </Button>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            );
                        })}
                    </Box>

                    {/* Footer */}
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Typography variant="caption" color="text.secondary">
                            © 2024 Role-Based User Management Dashboard
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginPage;
