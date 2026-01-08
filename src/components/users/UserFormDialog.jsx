/**
 * User Form Dialog
 * Add/Edit user modal
 */

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem,
    FormControlLabel,
    Switch,
    Box,
} from '@mui/material';
import { USER_ROLES, ROLE_LABELS, USER_STATUS } from '../../config/constants';
import { validateUserForm } from '../../utils/validation';
import UnsavedChangesDialog from '../common/UnsavedChangesDialog';

export const UserFormDialog = ({ open, onClose, onSubmit, user = null, loading = false }) => {
    const isEdit = Boolean(user);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: USER_ROLES.VIEWER,
        phone: '',
        city: '',
        company: '',
        website: '',
        status: USER_STATUS.ACTIVE,
        password: '',
    });
    const [initialData, setInitialData] = useState({});
    const [errors, setErrors] = useState({});
    const [isDirty, setIsDirty] = useState(false);
    const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);

    useEffect(() => {
        const defaultData = {
            firstName: '',
            lastName: '',
            email: '',
            role: USER_ROLES.VIEWER,
            phone: '',
            city: '',
            company: '',
            website: '',
            status: USER_STATUS.ACTIVE,
            password: '',
        };

        if (user) {
            const userData = {
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                role: user.role || USER_ROLES.VIEWER,
                phone: user.phone || '',
                city: user.city || '',
                company: user.company || '',
                website: user.website || '',
                status: user.status || USER_STATUS.ACTIVE,
                password: '',
            };
            setFormData(userData);
            setInitialData(userData);
        } else {
            setFormData(defaultData);
            setInitialData(defaultData);
        }
        setErrors({});
        setIsDirty(false);
    }, [user, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newData = {
            ...formData,
            [name]: value,
        };
        setFormData(newData);
        setIsDirty(JSON.stringify(newData) !== JSON.stringify(initialData));
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleStatusChange = (e) => {
        const newData = {
            ...formData,
            status: e.target.checked ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE,
        };
        setFormData(newData);
        setIsDirty(JSON.stringify(newData) !== JSON.stringify(initialData));
    };

    const handleClose = () => {
        if (isDirty) {
            setShowUnsavedWarning(true);
        } else {
            onClose();
        }
    };

    const handleDiscardChanges = () => {
        setShowUnsavedWarning(false);
        setIsDirty(false);
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateUserForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSubmit(formData);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {isEdit ? 'Edit User' : 'Add New User'}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    error={Boolean(errors.firstName)}
                                    helperText={errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    error={Boolean(errors.lastName)}
                                    helperText={errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email}
                                    disabled={isEdit}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    select
                                    label="Role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    error={Boolean(errors.role)}
                                    helperText={errors.role}
                                >
                                    {Object.values(USER_ROLES).map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {ROLE_LABELS[role]}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={Boolean(errors.phone)}
                                    helperText={errors.phone}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    error={Boolean(errors.city)}
                                    helperText={errors.city}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    error={Boolean(errors.company)}
                                    helperText={errors.company}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    error={Boolean(errors.website)}
                                    helperText={errors.website}
                                    placeholder="www.example.com"
                                />
                            </Grid>
                            {!isEdit && (
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={Boolean(errors.password)}
                                        helperText={errors.password || 'Password is required for new users'}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.status === USER_STATUS.ACTIVE}
                                            onChange={handleStatusChange}
                                            color="primary"
                                        />
                                    }
                                    label={formData.status === USER_STATUS.ACTIVE ? 'Active' : 'Inactive'}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ padding: 2 }}>
                    <Button onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>

            <UnsavedChangesDialog
                open={showUnsavedWarning}
                onDiscard={handleDiscardChanges}
                onCancel={() => setShowUnsavedWarning(false)}
            />
        </>
    );
};

export default UserFormDialog;
