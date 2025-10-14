import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddUserMutation, useUpdateUserMutation } from './usersApi';
import type { User } from './usersTypes';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  username: z.string().min(1, 'Required'),
});

type FormData = z.infer<typeof schema>;

export default function UserDialog({
  open,
  onClose,
  editing,
}: {
  open: boolean;
  onClose: () => void;
  editing: User | null;
}) {
  const [addUser, { isLoading: adding }] = useAddUserMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (editing) reset({ name: editing.name, email: editing.email, username: editing.username });
    else reset({ name: '', email: '', username: '' });
  }, [editing, reset]);

  async function onSubmit(data: FormData) {
    try {
      if (editing) {
        await updateUser({ id: editing.id, ...data }).unwrap();
      } else {
        await addUser(data).unwrap();
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{editing ? 'Edit User' : 'Add User'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display="grid" gap={2} mt={1}>
            <TextField label="Name" {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
            <TextField label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
            <TextField label="Username" {...register('username')} error={!!errors.username} helperText={errors.username?.message} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={adding || updating}>
            {editing ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
