import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentKudos, setRecentKudos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'x-auth-token': token };
        
        const [statsRes, kudosRes] = await Promise.all([
          axios.get('http://localhost:5000/api/kudos/stats', { headers }),
          axios.get('http://localhost:5000/api/kudos', { headers }),
        ]);

        setStats(statsRes.data);
        setRecentKudos(kudosRes.data.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: stats?.categoryStats?.map(stat => stat._id) || [],
    datasets: [
      {
        label: 'Kudos by Category',
        data: stats?.categoryStats?.map(stat => stat.count) || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Kudos Distribution by Category',
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Kudos Statistics
            </Typography>
            {stats && (
              <Box sx={{ height: 300 }}>
                <Bar options={chartOptions} data={chartData} />
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
            {stats && (
              <List>
                <ListItem>
                  <ListItemText
                    primary="Kudos Received"
                    secondary={stats.kudosReceived}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Kudos Given"
                    secondary={stats.kudosGiven}
                  />
                </ListItem>
              </List>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Kudos
            </Typography>
            <List>
              {recentKudos.map((kudo, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${kudo.from.name} → ${kudo.to.name}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {kudo.category}
                        </Typography>
                        {` — ${kudo.message}`}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
