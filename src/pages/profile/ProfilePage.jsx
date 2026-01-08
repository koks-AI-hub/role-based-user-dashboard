/**
 * User Profile Page
 * View and edit user profile information
 */

import React, { useState } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Avatar,
    Divider,
    Paper,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LockIcon from '@mui/icons-material/Lock';
import MainLayout from '../../components/layout/MainLayout';
import SnackbarNotification from '../../components/common/SnackbarNotification';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { formatDate, getInitials, getAvatarColor } from '../../utils/formatters';
import { validateName, validateEmail, validatePhone } from '../../utils/validation';
import { ROLE_LABELS } from '../../config/constants';
import * as authService from '../../services/authService';

export const ProfilePage = () => {
    const { user, updateUser } = useAuth();
    const { notification, showSuccess, showError, closeNotification } = useNotification();
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });
    const [errors, setErrors] = useState({});
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleEdit = () => {
        setEditMode(true);
        setFormData({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phone: user?.phone || '',
        });
    };

    const handleCancel = () => {
        setEditMode(false);
        setFormData({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phone: user?.phone || '',
        });
        setErrors({});
    };

    const handleSave = async () => {
        // Validate
        const newErrors = {};
        const firstNameError = validateName(formData.firstName, 'First name');
        if (firstNameError) newErrors.firstName = firstNameError;

        const lastNameError = validateName(formData.lastName, 'Last name');
        if (lastNameError) newErrors.lastName = lastNameError;

        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;

        const phoneError = validatePhone(formData.phone);
        if (phoneError) newErrors.phone = phoneError;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            // In a real app, this would call an API
            await new Promise(resolve => setTimeout(resolve, 500));

            // Update user in context
            updateUser(formData);

            showSuccess('Profile updated successfully');
            setEditMode(false);
        } catch (error) {
            showError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const userInitials = user ? getInitials(user.firstName, user.lastName) : '??';
    const userAvatarColor = user ? getAvatarColor(user.email) : '#757575';

    return (
        <MainLayout>
            <Box>
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        My Profile
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your account information and settings
                    </Typography>
                </Box>

                <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                    {/* Profile Card */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                                    <Avatar
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            bgcolor: userAvatarColor,
                                            fontSize: '2.5rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {userInitials}
                                    </Avatar>
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: 'primary.dark',
                                            },
                                        }}
                                        size="small"
                                    >
                                        <CameraAltIcon fontSize="small" />
                                    </IconButton>
                                </Box>

                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                                    {user?.firstName} {user?.lastName}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {user?.email}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                                    <Paper
                                        sx={{
                                            px: 2,
                                            py: 1,
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                            {ROLE_LABELS[user?.role]}
                                        </Typography>
                                    </Paper>
                                </Box>

                                <Divider sx={{ my: 3 }} />

                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                        Member Since
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {formatDate(user?.createdAt)}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Profile Information */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Profile Information
                                    </Typography>
                                    {!editMode && (
                                        <Button
                                            startIcon={<EditIcon />}
                                            onClick={handleEdit}
                                            variant="outlined"
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </Box>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                            error={Boolean(errors.firstName)}
                                            helperText={errors.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                            error={Boolean(errors.lastName)}
                                            helperText={errors.lastName}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={true}
                                            helperText="Email cannot be changed"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                            error={Boolean(errors.phone)}
                                            helperText={errors.phone}
                                        />
                                    </Grid>
                                </Grid>

                                {editMode && (
                                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<SaveIcon />}
                                            onClick={handleSave}
                                            disabled={loading}
                                        >
                                            {loading ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<CancelIcon />}
                                            onClick={handleCancel}
                                            disabled={loading}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>

                        {/* Security Section */}
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Security
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            Password
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Last changed: {formatDate(user?.createdAt)}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        startIcon={<LockIcon />}
                                        onClick={() => setPasswordDialogOpen(true)}
                                    >
                                        Change Password
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Notifications */}
                <SnackbarNotification
                    open={notification.open}
                    message={notification.message}
                    severity={notification.severity}
                    onClose={closeNotification}
                />
            </Box>
        </MainLayout>
    );
};

export default ProfilePage;
