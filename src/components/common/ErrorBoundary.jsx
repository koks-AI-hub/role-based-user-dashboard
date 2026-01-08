/**
 * Error Boundary Component
 * Catches JavaScript errors in child components
 */

import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({
            error,
            errorInfo,
        });
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        padding: 3,
                        bgcolor: 'background.default',
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 4,
                            maxWidth: 600,
                            textAlign: 'center',
                        }}
                    >
                        <ErrorOutlineIcon
                            sx={{
                                fontSize: 64,
                                color: 'error.main',
                                mb: 2,
                            }}
                        />
                        <Typography variant="h4" gutterBottom>
                            Oops! Something went wrong
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            We encountered an unexpected error. Please try reloading the page.
                        </Typography>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <Box
                                sx={{
                                    mt: 3,
                                    p: 2,
                                    bgcolor: 'grey.100',
                                    borderRadius: 1,
                                    textAlign: 'left',
                                    overflow: 'auto',
                                }}
                            >
                                <Typography variant="caption" component="pre">
                                    {this.state.error.toString()}
                                </Typography>
                            </Box>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleReload}
                            sx={{ mt: 3 }}
                        >
                            Reload Page
                        </Button>
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
