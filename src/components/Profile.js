import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [kudos, setKudos] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    department: user?.department || '',
    bio: user?.bio || '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'x-auth-token': token };
        
        const [statsRes, kudosRes] = await Promise.all([
          axios.get('http://localhost:5000/api/kudos/stats', { headers }),
          axios.get('http://localhost:5000/api/kudos/user', { headers }),
        ]);

        setStats(statsRes.data);
        setKudos(kudosRes.data);
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/users/profile',
        profileData,
        {
          headers: { 'x-auth-token': token },
        }
      );
      setOpenEdit(false);
      // Refresh user data
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const calculateLevel = (kudosCount) => {
    const levels = [
      { name: 'Rookie', threshold: 0 },
      { name: 'Rising Star', threshold: 10 },
      { name: 'Champion', threshold: 25 },
      { name: 'Elite', threshold: 50 },
      { name: 'Legend', threshold: 100 },
    ];

    const currentLevel = levels.reduce((acc, level) => {
      if (kudosCount >= level.threshold) {
        return level;
      }
      return acc;
    });

    const nextLevel = levels[levels.indexOf(currentLevel) + 1];
    const progress = nextLevel
      ? ((kudosCount - currentLevel.threshold) /
          (nextLevel.threshold - currentLevel.threshold)) *
        100
      : 100;

    return {
      name: currentLevel.name,
      progress: Math.min(progress, 100),
      nextLevel: nextLevel?.name || 'Max Level',
    };
  };

  const level = calculateLevel(stats?.kudosReceived || 0);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'secondary.main',
                  fontSize: '3rem',
                  mb: 2,
                }}
              >
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
              <IconButton
                sx={{
                  position: 'absolute',
                  right: 0,
                  bottom: 16,
                  bgcolor: 'background.paper',
                }}
                onClick={() => setOpenEdit(true)}
              >
                <EditIcon />
              </IconButton>
            </Box>
            <Typography variant="h5" gutterBottom>
              {user?.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {user?.department}
            </Typography>
            <Chip
              label={level.name}
              color="primary"
              sx={{ mt: 1 }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Progress to {level.nextLevel}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={level.progress}
                sx={{ mt: 1, height: 8, borderRadius: 4 }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Kudos Received
                  </Typography>
                  <Typography variant="h4">
                    {stats?.kudosReceived || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Kudos Given
                  </Typography>
                  <Typography variant="h4">
                    {stats?.kudosGiven || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Paper sx={{ mt: 3, p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Kudos
            </Typography>
            {kudos.map((kudo, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: 'background.default',
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  From {kudo.from.name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {kudo.message}
                </Typography>
                <Chip
                  label={kudo.category}
                  size="small"
                  sx={{ mt: 1 }}
                  color="secondary"
                />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Department"
            value={profileData.department}
            onChange={(e) =>
              setProfileData({ ...profileData, department: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Bio"
            value={profileData.bio}
            onChange={(e) =>
              setProfileData({ ...profileData, bio: e.target.value })
            }
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEditProfile} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
