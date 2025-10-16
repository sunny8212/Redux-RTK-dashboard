import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Snackbar,
  Alert,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from './usersApi';
import UserDialog from './UserDialog';
import ConfirmDialog from './ConfirmDialog';
import type { User } from './usersTypes';

export default function UserTable() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: users, isLoading, isError, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [confirm, setConfirm] = useState<{ open: boolean; id?: number }>({ open: false });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity?: 'success' | 'error' }>({ open: false, message: '' });

  const filtered = useMemo(() => {
    if (!users) return [];
    const q = search.toLowerCase();
    return users.filter((u) => u.name.toLowerCase().includes(q));
  }, [users, search]);

  async function handleDelete(id?: number) {
    if (!id) return;
    try {
      await deleteUser(id).unwrap();
      setSnackbar({ open: true, message: 'User deleted', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete', severity: 'error' });
    } finally {
      setConfirm({ open: false });
    }
  }

  if (isLoading) return <CircularProgress />;
  if (isError)
    return (
      <Alert severity="error" action={<Button onClick={() => refetch()}>Retry</Button>}>
        Failed to load users
      </Alert>
    );

  return (
    <Box>
      <Box display="flex" flexDirection={isSmall ? 'column' : 'row'} gap={2} alignItems={isSmall ? 'stretch' : 'center'} mb={2}>
        <TextField
          label="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          fullWidth={isSmall}
        />
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => {
            setEditing(null);
            setOpenDialog(true);
          }}
          sx={{ alignSelf: isSmall ? 'stretch' : 'center' }}
        >
          Add User
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={(theme) => ({
          borderRadius: 4,
          paddingLeft: isSmall ? 1 : 7,
          overflow: isSmall ? 'auto' : 'hidden',
          maxHeight: isSmall ? '60vh' : 'auto',
          boxShadow: '0px 6px 24px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(6px)',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(195, 197, 198, 0.9)',
          transition: 'all 0.3s ease',
        })}
      >
        <Table sx={{pb: 10,}}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Username</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => { setEditing(user); setOpenDialog(true); }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => setConfirm({ open: true, id: user.id })}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer showing total records */}
      <Box mt={1} mb={3} display="flex" justifyContent="center" sx={{ px: isSmall ? 1 : 4, width: '100%' }}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Showing {filtered.length} of {users ? users.length : 0} records
        </Typography>
      </Box>

      <UserDialog open={openDialog} onClose={() => setOpenDialog(false)} editing={editing} />
      <ConfirmDialog
        open={confirm.open}
        title="Delete this user?"
        onClose={() => setConfirm({ open: false })}
        onConfirm={() => handleDelete(confirm.id)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity || 'success'}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
