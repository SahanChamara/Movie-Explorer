import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  IconButton,
  Chip,
  Tooltip
} from '@mui/material';
import { Favorite, FavoriteBorder, Star } from '@mui/icons-material';
import type { Movie } from '../context/MovieContext';
import { useMovies } from '../context/MovieContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovies();
  const isFav = isFavorite(movie.id);

  // Get the movie title (can be either title or name depending on whether it's a movie or TV show)
  const title = movie.title || movie.name || 'Unknown';
  
  // Get the release year
  const releaseDate = movie.release_date || movie.first_air_date;
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : null;
  
  // Format the rating to one decimal place
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  
  // Function to handle favorite toggle
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFav) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };
  
  // Helper function to get the appropriate background color for the rating chip
  const getRatingColor = (rating: number) => {
    if (rating >= 7) return 'success';
    if (rating >= 5) return 'warning';
    return 'error';
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <CardActionArea 
        component={Link} 
        to={`/movie/${movie.id}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="225"
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image'
            }
            alt={title}
          />
          
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              zIndex: 1 
            }}
          >
            <Tooltip title={isFav ? "Remove from favorites" : "Add to favorites"}>
              <IconButton
                size="small"
                onClick={handleFavoriteToggle}
                sx={{
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                  },
                }}
              >
                {isFav ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          </Box>
          
          {movie.vote_average > 0 && (
            <Chip
              icon={<Star sx={{ color: 'inherit' }} />}
              label={rating}
              size="small"
              color={getRatingColor(movie.vote_average) as 'success' | 'warning' | 'error'}
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                fontWeight: 'bold',
              }}
            />
          )}
          
          {movie.media_type && (
            <Chip
              label={movie.media_type === 'tv' ? 'TV' : 'Movie'}
              size="small"
              color="primary"
              variant="outlined"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                bgcolor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                borderColor: 'white',
              }}
            />
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {releaseYear || 'Unknown Year'}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              flexGrow: 1,
            }}
          >
            {movie.overview || 'No description available.'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;