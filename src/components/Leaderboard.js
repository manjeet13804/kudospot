import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Tab,
  Tabs,
  Card,
  CardContent,
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Whatshot as FireIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import axios from 'axios';

const LeaderboardCard = ({ rank, user, score, type }) => {
  const theme = useTheme();
  const maxScore = 100; // This should be dynamic based on the highest score

  return (
    <Card
      sx={{
        mb: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateX(8px)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              width: 40,
              color:
                rank === 1
                  ? theme.palette.warning.main
                  : rank === 2
                  ? theme.palette.grey[400]
                  : rank === 3
                  ? theme.palette.warning.dark
                  : theme.palette.text.secondary,
              fontWeight: 600,
            }}
          >
            {rank}
          </Typography>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 48,
              height: 48,
              mr: 2,
            }}
          >
            {user.name.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user.department}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <LinearProgress
                variant="determinate"
                value={(score / maxScore) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: theme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3,
                    bgcolor:
                      rank === 1
                        ? theme.palette.warning.main
                        : theme.palette.primary.main,
                  },
                }}
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right', ml: 2 }}>
            <Typography variant="h6" color="primary">
              {score}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {type === 'received' ? 'Kudos' : 'Given'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Leaderboard = () => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [leaderboard, setLeaderboard] = useState({
    received: [],
    given: [],
    trending: [],
  });

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/kudos/leaderboard', {
        headers: { 'x-auth-token': token },
      });
      setLeaderboard(res.data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    }
  };

  const renderTopThree = (users) => {
    return (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Second Place */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              textAlign: 'center',
              height: '100%',
              bgcolor: theme.palette.grey[100],
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.palette.grey[400],
                margin: '0 auto 16px',
              }}
            >
              {users[1]?.name.charAt(0)}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              2nd Place
            </Typography>
            <Typography variant="subtitle1">{users[1]?.name}</Typography>
            <Typography variant="h6" color="primary">
              {users[1]?.score} Kudos
            </Typography>
          </Paper>
        </Grid>

        {/* First Place */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              textAlign: 'center',
              height: '100%',
              bgcolor: theme.palette.warning.light,
              transform: 'translateY(-20px)',
            }}
          >
            <TrophyIcon
              sx={{
                fontSize: 40,
                color: theme.palette.warning.main,
                mb: 2,
              }}
            />
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: theme.palette.warning.main,
                margin: '0 auto 16px',
              }}
            >
              {users[0]?.name.charAt(0)}
            </Avatar>
            <Typography variant="h4" gutterBottom>
              1st Place
            </Typography>
            <Typography variant="h6">{users[0]?.name}</Typography>
            <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
              {users[0]?.score} Kudos
            </Typography>
          </Paper>
        </Grid>

        {/* Third Place */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              textAlign: 'center',
              height: '100%',
              bgcolor: theme.palette.warning.light,
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.palette.warning.dark,
                margin: '0 auto 16px',
              }}
            >
              {users[2]?.name.charAt(0)}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              3rd Place
            </Typography>
            <Typography variant="subtitle1">{users[2]?.name}</Typography>
            <Typography variant="h6" color="primary">
              {users[2]?.score} Kudos
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Leaderboard
        </Typography>
        <Typography color="textSecondary">
          Recognize top contributors and celebrate their achievements
        </Typography>
      </Box>

      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        sx={{ mb: 4 }}
      >
        <Tab
          icon={<TrophyIcon />}
          label="Most Received"
          iconPosition="start"
        />
        <Tab
          icon={<FireIcon />}
          label="Most Given"
          iconPosition="start"
        />
        <Tab
          icon={<TrendingIcon />}
          label="Trending"
          iconPosition="start"
        />
      </Tabs>

      {tab === 0 && (
        <>
          {renderTopThree(leaderboard.received)}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Rankings
          </Typography>
          {leaderboard.received.slice(3).map((user, index) => (
            <LeaderboardCard
              key={user._id}
              rank={index + 4}
              user={user}
              score={user.score}
              type="received"
            />
          ))}
        </>
      )}

      {tab === 1 && (
        <>
          {renderTopThree(leaderboard.given)}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Rankings
          </Typography>
          {leaderboard.given.slice(3).map((user, index) => (
            <LeaderboardCard
              key={user._id}
              rank={index + 4}
              user={user}
              score={user.score}
              type="given"
            />
          ))}
        </>
      )}

      {tab === 2 && (
        <>
          {renderTopThree(leaderboard.trending)}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Rankings
          </Typography>
          {leaderboard.trending.slice(3).map((user, index) => (
            <LeaderboardCard
              key={user._id}
              rank={index + 4}
              user={user}
              score={user.score}
              type="trending"
            />
          ))}
        </>
      )}
    </Container>
  );
};

export default Leaderboard;
