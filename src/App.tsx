import React from "react";
import { Box, Container, Typography } from "@mui/material";
import TopBar from "./components/TopBar";
import UserTable from "./features/users/userTable";

interface AppProps {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

export default function App({ toggleTheme, mode }: AppProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        transition: "all 0.3s ease",
      }}
    >
      <TopBar toggleTheme={toggleTheme} mode={mode} />
      <Container
        maxWidth={false}
        sx={{
          mt: 4,
          flexGrow: 1,
          px: { xs: 2, sm: 4, md: 8 },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          User Management Dashboard
        </Typography>
        <Box sx={{ width: "100%", maxWidth: "1400px" }}>
          <UserTable />
        </Box>
      </Container>
    </Box>
  );
}
