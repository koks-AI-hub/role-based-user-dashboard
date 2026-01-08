/**
 * Manager Dashboard
 * Team overview for managers
 */

import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip,
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MainLayout from '../../components/layout/MainLayout';
import StatsCard from '../../components/dashboard/StatsCard';
import Loading from '../../components/common/Loading';
import { getDashboardStats, getRecentActivities } from '../../services/mockData';
import { useAuth } from '../../hooks/useAuth';
import { formatRelativeTime } from '../../utils/formatters';

export const ManagerDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
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
                        Manager Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Welcome back, {user.firstName}! Here's your team overview.
                    </Typography>
                </Box>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatsCard
                            title="Team Members"
                            value={stats.teamMembers}
                            icon={GroupsIcon}
                            color="primary"
                            subtitle="Total team size"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            title="Active Projects"
                            value={stats.activeProjects}
                            icon={AssignmentIcon}
                            color="info"
                            subtitle="In progress"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            title="Completed Tasks"
                            value={stats.completedTasks}
                            icon={CheckCircleIcon}
                            color="success"
                            subtitle="This month"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            title="Pending Tasks"
                            value={stats.pendingTasks}
                            icon={PendingIcon}
                            color="warning"
                            subtitle="Awaiting action"
                        />
                    </Grid>
                </Grid>

                {/* Performance Overview */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Team Performance
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    height: 300,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    bgcolor: 'action.hover',
                                    borderRadius: 2,
                                    gap: 2,
                                }}>
                                    <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                        {stats.teamPerformance}%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Overall team performance score
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                                    Team Activity
                                </Typography>
                                <List>
                                    {activities.map((activity) => (
                                        <ListItem key={activity.id} sx={{ px: 0 }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                                                    {activity.user.charAt(0)}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={activity.description}
                                                secondary={formatRelativeTime(activity.timestamp)}
                                                primaryTypographyProps={{
                                                    variant: 'body2',
                                                    noWrap: true,
                                                }}
                                                secondaryTypographyProps={{
                                                    variant: 'caption',
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </MainLayout>
    );
};

export default ManagerDashboard;
