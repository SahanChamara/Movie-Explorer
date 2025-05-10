import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { useMovies } from '../context/MovieContext';
import MovieList from '../components/MovieList';
import { useAuth } from '../context/AuthContext';

const Favorites: React.FC = () => {
  const { favoriteMovies } = useMovies();
  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 2, 
            borderRadius: 2,
            bgcolor: 'background.paper',
            backgroundImage: (theme) => 
              theme.palette.mode === 'light' 
                ? 'linear-gradient(120deg, #fce4ec 0%, #f3e5f5 100%)' 
                : 'linear-gradient(120deg, #880e4f 0%, #4a148c 100%)',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            My Favorite Movies
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {favoriteMovies.length > 0
              ? `You have ${favoriteMovies.length} favorite ${
                  favoriteMovies.length === 1 ? 'movie' : 'movies'
                }`
              : 'You haven\'t added any favorites yet'}
          </Typography>
        </Paper>

        {!isAuthenticated && favoriteMovies.length === 0 && (
          <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              To save favorites across devices, please log in.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Your favorites are currently stored in your browser's local storage.
            </Typography>
          </Box>
        )}

        <MovieList
          title="Favorites"
          movies={favoriteMovies}
          emptyMessage="You haven't added any favorites yet. Browse movies and click the heart icon to add them to your favorites."
        />
      </Box>
    </Container>
  );
};

export default Favorites;