import React, { useState } from 'react';
import { Modal, TextField, Button, Typography, Box, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axiosInstance from '../utils/axiosInstance';

const ChangePassword = ({ open, handleClose }) => {
  const [existingPassword, setExistingPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showExistingPassword, setShowExistingPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await axiosInstance.put('/change-password', {
        password: existingPassword,
        newPassword,
      });

      setSuccess(response.data.message);
      handleClose();
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'An error occurred.');
      } else {
        setError('An error occurred.');
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='change-password-title'
      aria-describedby='change-password-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          border: '1px solid #ccc',
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingY: '2rem',
          paddingX: '2rem',
        }}
      >
        <Typography
          id='change-password-title'
          variant='h6'
          component='h2'
          gutterBottom
        >
          Change Password
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{ width: '100%' }}
        >
          <FormControl fullWidth margin='normal' variant='outlined'>
            <InputLabel htmlFor='existing-password'>Existing Password</InputLabel>
            <OutlinedInput
              id='existing-password'
              type={showExistingPassword ? 'text' : 'password'}
              value={existingPassword}
              onChange={(e) => setExistingPassword(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => setShowExistingPassword(!showExistingPassword)}
                  >
                    {showExistingPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Existing Password'
              required
            />
          </FormControl>
          <FormControl fullWidth margin='normal' variant='outlined'>
            <InputLabel htmlFor='new-password'>New Password</InputLabel>
            <OutlinedInput
              id='new-password'
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='New Password'
              required
            />
          </FormControl>
          <FormControl fullWidth margin='normal' variant='outlined'>
            <InputLabel htmlFor='confirm-new-password'>Confirm New Password</InputLabel>
            <OutlinedInput
              id='confirm-new-password'
              type={showConfirmNewPassword ? 'text' : 'password'}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                  >
                    {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Confirm New Password'
              required
            />
          </FormControl>
          {error && (
            <Typography color='error' variant='body2' sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color='success' variant='body2' sx={{ mt: 2 }}>
              {success}
            </Typography>
          )}
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 4 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangePassword;
