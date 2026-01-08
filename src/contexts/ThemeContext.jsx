/**
 * Theme Context
 * Manages light/dark theme mode
 */

import React, { createContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '../theme/theme';
import { STORAGE_KEYS } from '../config/constants';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    /**
     * Initialize theme mode from localStorage
     */
    useEffect(() => {
        const savedMode = localStorage.getItem(STORAGE_KEYS.THEME_MODE);
        if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
            setMode(savedMode);
        }
    }, []);

    /**
     * Toggle theme mode
     */
    const toggleTheme = () => {
        setMode(prevMode => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem(STORAGE_KEYS.THEME_MODE, newMode);
            return newMode;
        });
    };

    /**
     * Set specific theme mode
     */
    const setThemeMode = (newMode) => {
        if (newMode === 'light' || newMode === 'dark') {
            setMode(newMode);
            localStorage.setItem(STORAGE_KEYS.THEME_MODE, newMode);
        }
    };

    /**
     * Create theme object
     */
    const theme = useMemo(() => createAppTheme(mode), [mode]);

    const value = {
        mode,
        toggleTheme,
        setThemeMode,
        isDark: mode === 'dark',
    };

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
