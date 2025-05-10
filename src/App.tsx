import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

// Contexts
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';


// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <MovieProvider>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <Box sx={{ flexGrow: 1, pb: 4, pt: 2 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  
                  <Route 
                    path="/favorites" 
                    element={
                      <ProtectedRoute>
                        <Home/>
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </Box>
            </Box>
          </MovieProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;