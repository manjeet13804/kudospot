import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Fade,
  useTheme,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const categories = ['All', 'Teamwork', 'Innovation', 'Leadership', 'Excellence', 'Help'];

const KudosWall = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [kudos, setKudos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchKudos();
  }, []);

  const fetchKudos = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/kudos', {
        headers: { 'x-auth-token': token },
      });
      setKudos(res.data);
    } catch (err) {
      console.error('Error fetching kudos:', err);
    }
  };

  const handleLike = async (kudoId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/kudos/${kudoId}/like`,
        {},
        {
          headers: { 'x-auth-token': token },
        }
      );
      fetchKudos();
    } catch (err) {
      console.error('Error liking kudo:', err);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredKudos = kudos.filter((kudo) => {
    const matchesFilter = filter === 'All' || kudo.category === filter;
    const matchesSearch =
      search === '' ||
      kudo.message.toLowerCase().includes(search.toLowerCase()) ||
      kudo.from.name.toLowerCase().includes(search.toLowerCase()) ||
      kudo.to.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Kudos Wall
        </Typography>
        <Typography color="textSecondary">
          Celebrate and share achievements across the organization
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search kudos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setFilter(category)}
              color={filter === category ? 'primary' : 'default'}
              sx={{
                '&:hover': {
                  bgcolor: filter === category ? 'primary.dark' : 'action.hover',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredKudos.map((kudo) => (
          <Grid item xs={12} md={6} key={kudo._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar
                    sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}
                  >
                    {kudo.from.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {kudo.from.name} → {kudo.to.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(kudo.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={handleMenuOpen}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Typography variant="body1" paragraph>
                  {kudo.message}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Chip
                    label={kudo.category}
                    size="small"
                    color="secondary"
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      size="small"
                      onClick={() => handleLike(kudo._id)}
                      color={kudo.likes?.includes(user?._id) ? 'secondary' : 'default'}
                    >
                      {kudo.likes?.includes(user?._id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {kudo.likes?.length || 0}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleMenuClose}>Share</MenuItem>
        <MenuItem onClick={handleMenuClose}>Report</MenuItem>
      </Menu>
    </Container>
  );
};

export default KudosWall;
