/**
 * Forgot Password Page
 * Password reset request
 */

import React, { useState } from 'react';
import {
    Container,
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Link,
    Alert,
    Avatar,
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '../../config/constants';
import { validateEmail } from '../../utils/validation';
import * as authService from '../../services/authService';

export const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
        if (emailError) setEmailError('');
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const validationError = validateEmail(email);
        if (validationError) {
            setEmailError(validationError);
            return;
        }

        setLoading(true);

        try {
            const response = await authService.forgotPassword(email);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Failed to send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 4,
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            borderRadius: 3,
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'success.main', width: 56, height: 56 }}>
                            <CheckCircleOutlineIcon fontSize="large" />
                        </Avatar>

                        <Typography component="h1" variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                            Check Your Email
                        </Typography>

                        <Alert severity="success" sx={{ width: '100%', mb: 3 }}>
                            If an account exists with <strong>{email}</strong>, you will receive password reset
                            instructions shortly.
                        </Alert>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                            Please check your email inbox and follow the instructions to reset your password.
                        </Typography>

                        <Button
                            component={RouterLink}
                            to={ROUTES.LOGIN}
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ py: 1.5 }}
                        >
                            Back to Sign In
                        </Button>
                    </Paper>
                </Box>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: 3,
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'warning.main', width: 56, height: 56 }}>
                        <LockResetIcon fontSize="large" />
                    </Avatar>

                    <Typography component="h1" variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        Forgot Password?
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                        Enter your email address and we'll send you instructions to reset your password.
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleChange}
                            error={Boolean(emailError)}
                            helperText={emailError}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Reset Instructions'}
                        </Button>

                        <Box sx={{ textAlign: 'center' }}>
                            <Link
                                component={RouterLink}
                                to={ROUTES.LOGIN}
                                variant="body2"
                                underline="hover"
                            >
                                Back to Sign In
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default ForgotPasswordPage;
