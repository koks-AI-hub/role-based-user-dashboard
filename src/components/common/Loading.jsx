/**
 * Loading Component
 * Displays loading spinner and skeleton screens
 */

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const Loading = ({ message = 'Loading...', fullScreen = true }) => {
    if (fullScreen) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    gap: 2,
                }}
            >
                <CircularProgress size={48} thickness={4} />
                {message && (
                    <Typography variant="body1" color="text.secondary">
                        {message}
                    </Typography>
                )}
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                gap: 2,
            }}
        >
            <CircularProgress size={40} />
            {message && (
                <Typography variant="body2" color="text.secondary">
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default Loading;
