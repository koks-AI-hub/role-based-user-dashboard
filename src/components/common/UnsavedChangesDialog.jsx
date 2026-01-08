/**
 * Unsaved Changes Dialog
 * Warns user before closing form with unsaved data
 */

import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export const UnsavedChangesDialog = ({ open, onDiscard, onCancel }) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 2 },
            }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WarningAmberIcon color="warning" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Unsaved Changes
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary">
                    You have unsaved changes. Are you sure you want to close this form? All changes will be lost.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onCancel} variant="outlined">
                    Continue Editing
                </Button>
                <Button onClick={onDiscard} color="error" variant="contained">
                    Discard Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UnsavedChangesDialog;
