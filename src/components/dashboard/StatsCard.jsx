/**
 * Enhanced Stats Card Component
 * Modern, premium design with gradients and animations
 */

import React from 'react';
import { Card, CardContent, Box, Typography, alpha, useTheme } from '@mui/material';


export const StatsCard = ({ title, value, icon: Icon, color = 'primary', subtitle, gradient = false }) => {
    const theme = useTheme();

    const colorMap = {
        primary: { main: theme.palette.primary.main, light: theme.palette.primary.light },
        success: { main: theme.palette.success.main, light: theme.palette.success.light },
        error: { main: theme.palette.error.main, light: theme.palette.error.light },
        warning: { main: theme.palette.warning.main, light: theme.palette.warning.light },
        info: { main: theme.palette.info.main, light: theme.palette.info.light },
    };

    const selectedColor = colorMap[color] || colorMap.primary;

    return (
        <Card
            sx={{
                height: '100%',
                background: gradient
                    ? `linear-gradient(135deg, ${selectedColor.main} 0%, ${selectedColor.light} 100%)`
                    : 'background.paper',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: gradient ? 'none' : `1px solid ${alpha(selectedColor.main, 0.2)}`,
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 24px ${alpha(selectedColor.main, 0.2)}`,
                },
                '&::before': gradient ? undefined : {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${selectedColor.main}, ${selectedColor.light})`,
                },
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: gradient ? 'rgba(255,255,255,0.9)' : 'text.secondary',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                                mb: 1,
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{
                                color: gradient ? 'white' : 'text.primary',
                                fontWeight: 700,
                                mb: 0,
                            }}
                        >
                            {value}
                        </Typography>

                        {subtitle && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: gradient ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                                    display: 'block',
                                    mt: 0.5,
                                }}
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Box>

                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: gradient
                                ? 'rgba(255,255,255,0.2)'
                                : alpha(selectedColor.main, 0.1),
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        {Icon && (
                            <Icon
                                sx={{
                                    fontSize: 28,
                                    color: gradient ? 'white' : selectedColor.main,
                                }}
                            />
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
