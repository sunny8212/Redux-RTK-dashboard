import React from 'react';
import { Box, CssBaseline, Typography, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './app/store';
import UserTable from './features/users/UserTable';
import TopBar from './components/TopBar';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1976d2' },
    secondary: { main: '#03dac6' },
    background: {
      default: '#0a0a0a',
      paper: '#161616',
    },
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h4: { fontWeight: 600 },
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #0d1117, #161b22)',
          }}
        >
          <TopBar />
          <Container
            maxWidth={false}
            sx={{
              mt: 4,
              flexGrow: 1,
              px: { xs: 2, sm: 4, md: 8 },
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom color="primary">
              User Management Dashboard
            </Typography>
            <Box sx={{ width: '100%', maxWidth: '1400px' }}>
              <UserTable />
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}
