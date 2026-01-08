/**
 * Empty State Component
 * Displays when lists or content are empty
 */

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

export const EmptyState = ({
    icon: Icon = InboxIcon,
    title = 'No data available',
    description = '',
    actionLabel = '',
    onAction = null,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 6,
                textAlign: 'center',
            }}
        >
            <Icon
                sx={{
                    fontSize: 80,
                    color: 'text.disabled',
                    mb: 2,
                }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
                {title}
            </Typography>
            {description && (
                <Typography variant="body2" color="text.disabled" paragraph>
                    {description}
                </Typography>
            )}
            {actionLabel && onAction && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onAction}
                    sx={{ mt: 2 }}
                >
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
};

export default EmptyState;
