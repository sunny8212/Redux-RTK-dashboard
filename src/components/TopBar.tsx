import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Tooltip, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';

export default function TopBar() {
  const [darkMode, setDarkMode] = React.useState(true);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: darkMode
          ? 'linear-gradient(90deg, #1976d2, #2196f3)'
          : 'linear-gradient(90deg, #42a5f5, #90caf9)',
        boxShadow: 3,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h6" fontWeight={600}>
            User Dashboard
          </Typography>
        </motion.div>

        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title="Refresh Page">
            <IconButton color="inherit" onClick={() => window.location.reload()}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="GitHub Repo">
            <IconButton color="inherit" onClick={() => window.open('https://github.com/sunny8212', '_blank')}>
              <GitHubIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Toggle Theme (Mock)">
            <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
