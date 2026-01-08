/**
 * Main Layout Component
 * Wraps authenticated pages with AppBar and Sidebar
 */

import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import AppBarComponent from './AppBar';
import Sidebar from './Sidebar';

const DRAWER_WIDTH = 240;

export const MainLayout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMobileClose = () => {
        setMobileOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <AppBarComponent onMenuClick={handleDrawerToggle} drawerWidth={DRAWER_WIDTH} />
            <Sidebar mobileOpen={mobileOpen} onMobileClose={handleMobileClose} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    bgcolor: 'background.default',
                    minHeight: '100vh',
                }}
            >
                <Toolbar /> {/* Spacer for AppBar */}
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;
