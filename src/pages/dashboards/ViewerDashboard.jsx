/**
 * Viewer Dashboard Page
 * Personal overview for viewer users
 */

import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    LinearProgress,
} from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MainLayout from '../../components/layout/MainLayout';
import StatsCard from '../../components/dashboard/StatsCard';
import Loading from '../../components/common/Loading';
import { getDashboardStats, getRecentActivities } from '../../services/mockData';
import { useAuth } from '../../hooks/useAuth';
import { formatRelativeTime } from '../../utils/formatters';

export const ViewerDashboard = () => {
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

    const levelProgress = (stats.level / 10) * 100;

    return (
        <MainLayout>
            <Box>
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    {/* Header */}
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Viewer Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Welcome back, {user?.firstName}! Here's your personal overview.
                    </Typography>
                </Box>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            title="Completed"
                            value={stats.tasksCompleted}
                            icon={AssignmentTurnedInIcon}
                            color="success"
                            subtitle="Tasks done"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            title="In Progress"
                            value={stats.tasksInProgress}
                            icon={AssignmentIcon}
                            color="info"
                            subtitle="Active tasks"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            title="Pending"
                            value={stats.tasksPending}
                            icon={PendingActionsIcon}
                            color="warning"
                            subtitle="To start"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            title="Achievements"
                            value={stats.achievements}
                            icon={EmojiEventsIcon}
                            color="primary"
                            subtitle="Badges earned"
                        />
                    </Grid>
                </Grid>

                {/* Progress and Activities */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <StarIcon sx={{ mr: 1, color: 'warning.main' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Your Progress
                                    </Typography>
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Level {stats.level}
                                        </Typography>
                                        <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                                            {levelProgress}%
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={levelProgress}
                                        sx={{ height: 8, borderRadius: 4 }}
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Total Points
                                    </Typography>
                                    <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                        {stats.totalPoints}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                                    Recent Activity
                                </Typography>
                                <List>
                                    {activities.map((activity) => (
                                        <ListItem key={activity.id} sx={{ px: 0 }}>
                                            <ListItemIcon>
                                                <CheckCircleIcon color="success" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={activity.description}
                                                secondary={formatRelativeTime(activity.timestamp)}
                                                primaryTypographyProps={{
                                                    variant: 'body2',
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

export default ViewerDashboard;
