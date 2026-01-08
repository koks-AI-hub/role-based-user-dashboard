/**
 * User Detail Modal
 * Click-to-view user details with role-based editing
 */

import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Grid,
    Chip,
    Avatar,
    Divider,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import { USER_ROLES, ROLE_LABELS, USER_STATUS } from '../../config/constants';
import { hasPermission, PERMISSIONS } from '../../config/permissions';
import { formatDate, getInitials, getAvatarColor, formatFullName } from '../../utils/formatters';

export const UserDetailModal = ({ open, onClose, user, currentUserRole, onEdit }) => {
    if (!user) return null;

    const canEdit = hasPermission(currentUserRole, PERMISSIONS.EDIT_USER);
    const isViewer = currentUserRole === USER_ROLES.VIEWER;

    const InfoRow = ({ icon: Icon, label, value }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Icon sx={{ mr: 2, color: 'text.secondary', fontSize: 20 }} />
            <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                    {label}
                </Typography>
                <Typography variant="body1">{value || 'Not provided'}</Typography>
            </Box>
        </Box>
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                },
            }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        User Details
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                {/* User Header */}
                <Box sx={{ textAlign: 'center', mb: 3, pt: 1 }}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            mx: 'auto',
                            mb: 2,
                            bgcolor: getAvatarColor(user.id),
                            fontSize: '2rem',
                            fontWeight: 600,
                        }}
                    >
                        {getInitials(user.firstName, user.lastName)}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {formatFullName(user.firstName, user.lastName)}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1 }}>
                        <Chip
                            label={ROLE_LABELS[user.role]}
                            color={
                                user.role === USER_ROLES.ADMIN
                                    ? 'error'
                                    : user.role === USER_ROLES.MANAGER
                                        ? 'primary'
                                        : 'default'
                            }
                            size="small"
                        />
                        <Chip
                            label={user.status}
                            color={user.status === USER_STATUS.ACTIVE ? 'success' : 'default'}
                            size="small"
                            sx={{ textTransform: 'capitalize' }}
                        />
                    </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* User Information */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InfoRow icon={EmailIcon} label="Email Address" value={user.email} />
                    </Grid>
                    <Grid item xs={12}>
                        <InfoRow icon={PhoneIcon} label="Phone Number" value={user.phone} />
                    </Grid>
                    <Grid item xs={12}>
                        <InfoRow icon={LocationCityIcon} label="City" value={user.city} />
                    </Grid>
                    <Grid item xs={12}>
                        <InfoRow icon={BusinessIcon} label="Company" value={user.company} />
                    </Grid>
                    <Grid item xs={12}>
                        <InfoRow icon={LanguageIcon} label="Website" value={user.website} />
                    </Grid>
                    <Grid item xs={12}>
                        <InfoRow icon={PersonIcon} label="User ID" value={user.id} />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Metadata */}
                <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                        Account Created
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        {formatDate(user.createdAt)}
                    </Typography>

                    {user.lastLogin && (
                        <>
                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                Last Login
                            </Typography>
                            <Typography variant="body2">{formatDate(user.lastLogin)}</Typography>
                        </>
                    )}
                </Box>

                {isViewer && (
                    <Box
                        sx={{
                            mt: 3,
                            p: 2,
                            borderRadius: 1,
                            bgcolor: 'info.lighter',
                            border: '1px solid',
                            borderColor: 'info.light',
                        }}
                    >
                        <Typography variant="caption" color="info.dark">
                            <strong>Read-Only Mode:</strong> You have viewer access and cannot edit this user.
                        </Typography>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={onClose}>Close</Button>
                {canEdit && (
                    <Button
                        variant="contained"
                        onClick={() => {
                            onClose();
                            onEdit(user);
                        }}
                    >
                        Edit User
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailModal;
