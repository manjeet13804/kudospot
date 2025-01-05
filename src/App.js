import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Components
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import GiveKudos from './components/GiveKudos';
import Profile from './components/Profile';
import KudosWall from './components/KudosWall';
import Leaderboard from './components/Leaderboard';
import PrivateRoute from './components/PrivateRoute';

// Context
import { AuthProvider } from './context/AuthContext';

// Add Google Fonts
const googleFontsLink = document.createElement('link');
googleFontsLink.rel = 'stylesheet';
googleFontsLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
document.head.appendChild(googleFontsLink);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/give-kudos" element={<GiveKudos />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/kudos-wall" element={<KudosWall />} />
                      <Route path="/leaderboard" element={<Leaderboard />} />
                    </Routes>
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
