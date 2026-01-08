/**
 * Material UI Theme Configuration
 * Premium design with vibrant colors and modern aesthetics
 */

import { createTheme } from '@mui/material/styles';

// Light Mode Palette
const lightPalette = {
    mode: 'light',
    primary: {
        main: '#2563EB', // Modern Blue (FRD requirement)
        light: '#60A5FA',
        dark: '#1E40AF',
        contrastText: '#FFFFFF',
    },
    secondary: {
        main: '#9333EA', // Premium Purple (FRD requirement)
        light: '#C084FC',
        dark: '#7E22CE',
        contrastText: '#FFFFFF',
    },
    success: {
        main: '#16A34A', // FRD requirement
        light: '#4ADE80',
        dark: '#15803D',
        contrastText: '#FFFFFF',
    },
    error: {
        main: '#DC2626', // FRD requirement
        light: '#F87171',
        dark: '#B91C1C',
        contrastText: '#FFFFFF',
    },
    warning: {
        main: '#F59E0B', // FRD requirement
        light: '#FCD34D',
        dark: '#D97706',
        contrastText: '#000000',
    },
    info: {
        main: '#0EA5E9',
        light: '#38BDF8',
        dark: '#0284C7',
        contrastText: '#FFFFFF',
    },
    background: {
        default: '#F8FAFC', // FRD requirement
        paper: '#FFFFFF',
    },
    text: {
        primary: '#0F172A', // FRD requirement
        secondary: '#64748B', // FRD requirement
    },
};

const darkPalette = {
    mode: 'dark',
    primary: {
        main: '#60A5FA', // Lighter blue for dark mode
        light: '#93C5FD',
        dark: '#2563EB',
        contrastText: '#0F172A',
    },
    secondary: {
        main: '#C084FC', // Lighter purple for dark mode
        light: '#D8B4FE',
        dark: '#9333EA',
        contrastText: '#0F172A',
    },
    success: {
        main: '#4ADE80',
        light: '#86EFAC',
        dark: '#16A34A',
        contrastText: '#0F172A',
    },
    error: {
        main: '#F87171',
        light: '#FCA5A5',
        dark: '#DC2626',
        contrastText: '#0F172A',
    },
    warning: {
        main: '#FCD34D',
        light: '#FDE68A',
        dark: '#F59E0B',
        contrastText: '#0F172A',
    },
    info: {
        main: '#38BDF8',
        light: '#7DD3FC',
        dark: '#0EA5E9',
        contrastText: '#0F172A',
    },
    background: {
        default: '#0F172A', // FRD requirement
        paper: '#1E293B', // FRD requirement
    },
    text: {
        primary: '#E5E7EB', // FRD requirement
        secondary: '#94A3B8',
    },
};

// Typography Configuration
const typography = {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.3,
    },
    h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.4,
    },
    h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
    },
    h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.5,
    },
    h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.6,
    },
    button: {
        textTransform: 'none',
        fontWeight: 600,
    },
};

// Spacing and Breakpoints
const spacing = 8;

const breakpoints = {
    values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
    },
};

// Shape (Border Radius)
const shape = {
    borderRadius: 12,
};

// Component Overrides
const getComponentOverrides = (mode) => ({
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                padding: '8px 20px',
                fontSize: '0.875rem',
                fontWeight: 600,
                boxShadow: 'none',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transform: 'translateY(-2px)',
                },
            },
            contained: {
                '&:hover': {
                    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                },
            },
            outlined: {
                borderWidth: 2,
                '&:hover': {
                    borderWidth: 2,
                },
            },
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 16,
                boxShadow: mode === 'light'
                    ? '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)'
                    : '0 4px 6px rgba(0,0,0,0.4)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: mode === 'light'
                        ? '0 10px 25px rgba(0,0,0,0.12)'
                        : '0 10px 25px rgba(0,0,0,0.5)',
                },
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none',
            },
            elevation1: {
                boxShadow: mode === 'light'
                    ? '0 1px 3px rgba(0,0,0,0.08)'
                    : '0 1px 3px rgba(0,0,0,0.4)',
            },
        },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    borderRadius: 8,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                    },
                },
            },
        },
    },
    MuiChip: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                fontWeight: 500,
            },
        },
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                borderRight: 'none',
                boxShadow: mode === 'light'
                    ? '2px 0 8px rgba(0,0,0,0.08)'
                    : '2px 0 8px rgba(0,0,0,0.4)',
            },
        },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                boxShadow: mode === 'light'
                    ? '0 1px 3px rgba(0,0,0,0.08)'
                    : '0 1px 3px rgba(0,0,0,0.4)',
            },
        },
    },
    MuiTableCell: {
        styleOverrides: {
            head: {
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
            },
        },
    },
    MuiTooltip: {
        styleOverrides: {
            tooltip: {
                borderRadius: 8,
                fontSize: '0.75rem',
            },
        },
    },
});

/**
 * Create theme based on mode (light/dark)
 */
export const createAppTheme = (mode = 'light') => {
    const isDark = mode === 'dark';

    return createTheme({
        palette: {
            mode,
            ...(isDark ? darkPalette : lightPalette),
        },
        typography,
        spacing,
        breakpoints,
        shape,
        components: getComponentOverrides(mode),
    });
};

export default createAppTheme;
