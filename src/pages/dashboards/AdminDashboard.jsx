/**
 * Admin Dashboard
 * Overview and analytics for administrators
 */

import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Avatar,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MainLayout from '../../components/layout/MainLayout';
import StatsCard from '../../components/dashboard/StatsCard';
import Loading from '../../components/common/Loading';
import { getDashboardStats, getRecentActivities } from '../../services/mockData';
import { useAuth } from '../../hooks/useAuth';
import { formatRelativeTime, getInitials, getAvatarColor } from '../../utils/formatters';
import { USER_STATUS } from '../../config/constants';

export const AdminDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            const dashboardStats = getDashboardStats(user.role);
            const recentActivities = getRecentActivities(user.role);

            setStats(dashboardStats);
            setActivities(recentActivities);
            setLoading(false);
        };

        loadData();
    }, [user.role]);

    if (loading) {
        return (
            <MainLayout>
                <Loading message="Loading dashboard..." fullScreen={false} />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Box>
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Admin Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Welcome back, {user.firstName}! Here's what's happening with your users.
                    </Typography>
                </Box>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatsCard
                            title="Total Users"
                            value={stats.totalUsers}
                            icon={PeopleIcon}
                            color="primary"
                            trend={stats.userGrowth}
                            trendDirection="up"
                            subtitle="All registered users"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            title="Active Users"
                            value={stats.activeUsers}
                            icon={PersonIcon}
                            color="success"
                            subtitle="Currently active"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            title="Managers"
                            value={stats.totalManagers}
                            icon={SupervisorAccountIcon}
                            color="info"
                            subtitle="Manager accounts"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            title="Admins"
                            value={stats.totalAdmins}
                            icon={AdminPanelSettingsIcon}
                            color="warning"
                            subtitle="Administrator accounts"
                        />
                    </Grid>
                </Grid>

                {/* User Growth Chart Placeholder */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        User Growth
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    height: 300,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'action.hover',
                                    borderRadius: 2,
                                }}>
                                    <Typography variant="body2" color="text.secondary">
                                        User growth chart visualization area
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    Quick Stats
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            New Users This Month
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                            {stats.newUsersThisMonth}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            User Growth Rate
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main' }}>
                                            +{stats.userGrowth}%
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Recent Activities */}
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                            Recent Activities
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell>Activity</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Type</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {activities.map((activity) => (
                                        <TableRow key={activity.id} hover>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Avatar
                                                        sx={{
                                                            width: 32,
                                                            height: 32,
                                                            bgcolor: getAvatarColor(activity.user),
                                                            fontSize: '0.75rem',
                                                        }}
                                                    >
                                                        {getInitials(activity.user.split(' ')[0], activity.user.split(' ')[1])}
                                                    </Avatar>
                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                        {activity.user}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {activity.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="text.secondary">
                                                    {formatRelativeTime(activity.timestamp)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={activity.type.replace('_', ' ')}
                                                    size="small"
                                                    color={
                                                        activity.type.includes('created') ? 'success' :
                                                            activity.type.includes('deleted') ? 'error' :
                                                                activity.type.includes('updated') ? 'info' : 'default'
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Box>
        </MainLayout>
    );
};

export default AdminDashboard;
