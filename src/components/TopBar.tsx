import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Switch,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GitHubIcon from '@mui/icons-material/GitHub';

export default function TopBar({ toggleTheme, mode }) {
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          mode === "dark"
            ? "linear-gradient(90deg, #1976d2, #42a5f5)"
            : "linear-gradient(90deg, #90caf9, #2196f3)",
        boxShadow: 3,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={600}>
          User Dashboard
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <>
          <Tooltip title="Visit GitHub Repo">
              <IconButton color="inherit" onClick={() => window.open('https://github.com/sunny8212/Redux-RTK-dashboard', '_blank')}>
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle theme">
              <IconButton color="inherit" onClick={toggleTheme}>
                {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            
          </>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
