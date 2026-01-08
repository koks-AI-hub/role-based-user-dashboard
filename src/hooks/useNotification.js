/**
 * Custom hook for notifications
 * Provides easy access to snackbar notifications
 */

import { useState, useCallback } from 'react';

export const useNotification = () => {
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'info', // success, error, warning, info
    });

    const showNotification = useCallback((message, severity = 'info') => {
        setNotification({
            open: true,
            message,
            severity,
        });
    }, []);

    const showSuccess = useCallback((message) => {
        showNotification(message, 'success');
    }, [showNotification]);

    const showError = useCallback((message) => {
        showNotification(message, 'error');
    }, [showNotification]);

    const showWarning = useCallback((message) => {
        showNotification(message, 'warning');
    }, [showNotification]);

    const showInfo = useCallback((message) => {
        showNotification(message, 'info');
    }, [showNotification]);

    const closeNotification = useCallback(() => {
        setNotification(prev => ({ ...prev, open: false }));
    }, []);

    return {
        notification,
        showNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        closeNotification,
    };
};

export default useNotification;
