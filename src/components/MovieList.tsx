import React from 'react';
import { Grid, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';
import MovieCard from './MovieCard';
import type { Movie } from '../context/MovieContext';

interface MovieListProps {
  title: string;
  movies: Movie[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({
  title,
  movies,
  loading = false,
  error = null,
  emptyMessage = 'No movies found.',
  onLoadMore,
  hasMore = false,
}) => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold', 
          mb: 3,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: 60,
            height: 4,
            backgroundColor: 'primary.main',
            borderRadius: 2,
          },
        }}
      >
        {title}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {movies.length === 0 && !loading ? (
        <Typography variant="body1" color="text.secondary" sx={{ my: 4 }}>
          {emptyMessage}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {onLoadMore && hasMore && !loading && movies.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="outlined" 
            onClick={onLoadMore}
            size="large"
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              },
            }}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MovieList;