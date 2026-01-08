/**
 * User List/Management Page (Admin Only)
 * CRUD operations for user management
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Button,
    TextField,
    InputAdornment,
    MenuItem,
    Chip,
    IconButton,
    Tooltip,
    Typography,
    Paper,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MainLayout from '../../components/layout/MainLayout';
import UserFormDialog from '../../components/users/UserFormDialog';
import UserDetailModal from '../../components/users/UserDetailModal';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import SnackbarNotification from '../../components/common/SnackbarNotification';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import * as userService from '../../services/userService';
import { USER_ROLES, ROLE_LABELS, USER_STATUS } from '../../config/constants';
import { hasPermission, PERMISSIONS } from '../../config/permissions';
import { formatDate, formatFullName } from '../../utils/formatters';

export const UserListPage = () => {
    const { user } = useAuth();
    const canDelete = hasPermission(user?.role, PERMISSIONS.DELETE_USER);
    const canModify = hasPermission(user?.role, PERMISSIONS.EDIT_USER);
    const canAdd = hasPermission(user?.role, PERMISSIONS.ADD_USER);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [totalUsers, setTotalUsers] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const { notification, showSuccess, showError, closeNotification } = useNotification();

    const loadUsers = useCallback(async () => {
        setLoading(true);
        try {
            const options = {
                page: paginationModel.page,
                pageSize: paginationModel.pageSize,
                search: searchTerm,
                role: roleFilter !== 'all' ? roleFilter : undefined,
                status: statusFilter !== 'all' ? statusFilter : undefined,
            };

            const response = await userService.getUsers(options);
            setUsers(response.data);
            setTotalUsers(response.total);
        } catch (error) {
            showError('Failed to load users');
        } finally {
            setLoading(false);
        }
    }, [paginationModel, searchTerm, roleFilter, statusFilter, showError]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const handleAddUser = () => {
        setSelectedUser(null);
        setFormDialogOpen(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setFormDialogOpen(true);
    };

    const handleRowClick = (params) => {
        setSelectedUser(params.row);
        setDetailModalOpen(true);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!userToDelete) return;

        setFormLoading(true);
        try {
            await userService.deleteUser(userToDelete.id);
            showSuccess('User deleted successfully');
            setDeleteDialogOpen(false);
            setUserToDelete(null);
            loadUsers();
        } catch (error) {
            showError(error.message || 'Failed to delete user');
        } finally {
            setFormLoading(false);
        }
    };

    const handleFormSubmit = async (formData) => {
        setFormLoading(true);
        try {
            if (selectedUser) {
                // Update existing user
                await userService.updateUser(selectedUser.id, formData);
                showSuccess('User updated successfully');
            } else {
                // Create new user
                await userService.createUser(formData);
                showSuccess('User created successfully');
            }
            setFormDialogOpen(false);
            loadUsers();
        } catch (error) {
            showError(error.message || 'Failed to save user');
        } finally {
            setFormLoading(false);
        }
    };

    const handleExport = async () => {
        try {
            const { data, filename } = await userService.exportUsers(
                selectedRows.length > 0 ? selectedRows : null
            );

            // Create download link
            const blob = new Blob([data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            showSuccess(`Exported ${selectedRows.length > 0 ? selectedRows.length : totalUsers} users`);
        } catch (error) {
            showError('Failed to export users');
        }
    };

    const columns = [
        {
            field: 'fullName',
            headerName: 'Name',
            flex: 1,
            minWidth: 180,
            renderCell: (params) => formatFullName(params.row.firstName, params.row.lastName),
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 130,
            renderCell: (params) => (
                <Chip
                    label={ROLE_LABELS[params.value]}
                    color={
                        params.value === USER_ROLES.ADMIN ? 'error' :
                            params.value === USER_ROLES.MANAGER ? 'primary' : 'default'
                    }
                    size="small"
                />
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 110,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={params.value === USER_STATUS.ACTIVE ? 'success' : 'default'}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                />
            ),
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 150,
        },
        {
            field: 'createdAt',
            headerName: 'Created',
            width: 120,
            renderCell: (params) => formatDate(params.value),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <Tooltip title="View">
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRowClick(params);
                            }}
                            color="info"
                        >
                            <VisibilityIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    {canModify && (
                        <Tooltip title="Edit">
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditUser(params.row);
                                }}
                                color="primary"
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {canDelete && (
                        <Tooltip title="Delete">
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(params.row);
                                }}
                                color="error"
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            ),
        },
    ];

    return (
        <MainLayout>
            <Box>
                {/* Header */}
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        User Management
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<FileDownloadIcon />}
                            onClick={handleExport}
                        >
                            Export
                        </Button>
                        {canAdd && (
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleAddUser}
                            >
                                Add User
                            </Button>
                        )}
                    </Box>
                </Box>

                {/* Filters */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <TextField
                            placeholder="Search users..."
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ minWidth: 250 }}
                        />
                        <TextField
                            select
                            size="small"
                            label="Role"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            sx={{ minWidth: 150 }}
                        >
                            <MenuItem value="all">All Roles</MenuItem>
                            {Object.values(USER_ROLES).map((role) => (
                                <MenuItem key={role} value={role}>
                                    {ROLE_LABELS[role]}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            size="small"
                            label="Status"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            sx={{ minWidth: 150 }}
                        >
                            <MenuItem value="all">All Status</MenuItem>
                            <MenuItem value={USER_STATUS.ACTIVE}>Active</MenuItem>
                            <MenuItem value={USER_STATUS.INACTIVE}>Inactive</MenuItem>
                        </TextField>
                    </Box>
                </Paper>

                {/* Data Grid */}
                <Paper sx={{ height: 600 }}>
                    <DataGrid
                        rows={users}
                        columns={columns}
                        loading={loading}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[5, 10, 25, 50]}
                        rowCount={totalUsers}
                        paginationMode="server"
                        checkboxSelection
                        disableRowSelectionOnClick
                        onRowClick={handleRowClick}
                        onRowSelectionModelChange={(newSelection) => {
                            setSelectedRows(newSelection);
                        }}
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-cell:focus': {
                                outline: 'none',
                            },
                            '& .MuiDataGrid-row': {
                                cursor: 'pointer',
                            },
                        }}
                    />
                </Paper>

                {/* User Detail Modal */}
                <UserDetailModal
                    open={detailModalOpen}
                    onClose={() => {
                        setDetailModalOpen(false);
                        setSelectedUser(null);
                    }}
                    user={selectedUser}
                    currentUserRole={user?.role}
                    onEdit={(userToEdit) => {
                        setSelectedUser(userToEdit);
                        setFormDialogOpen(true);
                    }}
                />

                {/* Dialogs */}
                <UserFormDialog
                    open={formDialogOpen}
                    onClose={() => setFormDialogOpen(false)}
                    onSubmit={handleFormSubmit}
                    user={selectedUser}
                    loading={formLoading}
                />

                <DeleteConfirmDialog
                    open={deleteDialogOpen}
                    title="Delete User"
                    message={`Are you sure you want to delete ${userToDelete ? formatFullName(userToDelete.firstName, userToDelete.lastName) : 'this user'}? This action cannot be undone.`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => {
                        setDeleteDialogOpen(false);
                        setUserToDelete(null);
                    }}
                    loading={formLoading}
                />

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

export default UserListPage;
