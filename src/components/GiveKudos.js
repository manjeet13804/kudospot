import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const categories = [
  'Teamwork',
  'Innovation',
  'Leadership',
  'Excellence',
  'Help',
];

const GiveKudos = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    to: '',
    message: '',
    category: '',
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users', {
          headers: { 'x-auth-token': token },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/kudos',
        formData,
        {
          headers: { 'x-auth-token': token },
        }
      );
      setNotification({
        open: true,
        message: 'Kudos sent successfully!',
        severity: 'success',
      });
      setFormData({ to: '', message: '', category: '' });
    } catch (err) {
      setNotification({
        open: true,
        message: err.response?.data?.message || 'Failed to send kudos',
        severity: 'error',
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Give Kudos
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              select
              fullWidth
              label="Recipient"
              name="to"
              value={formData.to}
              onChange={handleChange}
              margin="normal"
              required
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name} - {user.department}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              margin="normal"
              required
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Send Kudos
            </Button>
          </form>
        </Paper>
      </Box>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default GiveKudos;
