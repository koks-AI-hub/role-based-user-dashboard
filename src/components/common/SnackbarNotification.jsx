/**
 * Snackbar Notification Component
 * Displays toast notifications
 */

import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { NOTIFICATION_DURATION } from '../../config/constants';

export const SnackbarNotification = ({
    open,
    message,
    severity = 'info',
    onClose,
    duration = NOTIFICATION_DURATION,
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                variant="filled"
                elevation={6}
                sx={{
                    width: '100%',
                    minWidth: 300,
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarNotification;
