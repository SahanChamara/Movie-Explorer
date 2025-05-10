import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  Grid,
  Button,
  CircularProgress,
  Paper,
  IconButton,
  Tooltip,
  Divider,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  Alert,
  Rating,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ArrowBack,
  Star,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import { useMovies, type MovieDetails as MovieDetailsType } from '../context/MovieContext';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { fetchMovieDetails, isFavorite, addToFavorites, removeFromFavorites, loading } = useMovies();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  
  const movieId = parseInt(id || '0', 10);
  const isFav = isFavorite(movieId);

  useEffect(() => {
    const getMovieDetails = async () => {
      if (movieId) {
        try {
          const details = await fetchMovieDetails(movieId);
          if (details) {
            setMovie(details);
            
            // Find trailer
            if (details.videos && details.videos.results.length > 0) {
              const trailer = details.videos.results.find(
                (video) => video.type === 'Trailer' && video.site === 'YouTube'
              ) || details.videos.results[0];
              
              if (trailer) {
                setTrailerKey(trailer.key);
              }
            }
          } else {
            setError('Failed to fetch movie details.');
          }
        } catch (err) {
          console.error('Error fetching movie details:', err);
          setError('An error occurred while fetching movie details.');
        }
      }
    };

    getMovieDetails();
  }, [movieId, fetchMovieDetails]);

  const handleFavoriteToggle = () => {
    if (!movie) return;
    
    if (isFav) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button startIcon={<ArrowBack />} onClick={handleBack} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (!movie) {
    return null;
  }

  // Determine title (for both movies and TV shows)
  const title = movie.title || movie.name || 'Unknown';
  
  // Get release date or first air date
  const releaseDate = movie.release_date || movie.first_air_date;
  const formattedDate = releaseDate 
    ? new Date(releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown';

  return (
    <Box>
      {/* Backdrop image */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 250, md: 350, lg: 450 },
          width: '100%',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Box
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(2px)',
          }}
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : 'https://via.placeholder.com/1920x1080?text=No+Backdrop'
          }
          alt={title}
        />
        
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 2,
            bgcolor: 'rgba(0,0,0,0.6)',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.8)',
            },
          }}
        >
          Back
        </Button>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 2 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={4}>
            {/* Movie poster */}
            <Grid item xs={12} sm={4} md={3}>
              <Card elevation={4} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/500x750?text=No+Image'
                  }
                  alt={title}
                  sx={{ height: '100%', minHeight: 350 }}
                />
              </Card>
            </Grid>

            {/* Movie details */}
            <Grid item xs={12} sm={8} md={9}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                  {title}
                </Typography>
                <Tooltip title={isFav ? "Remove from favorites" : "Add to favorites"}>
                  <IconButton
                    onClick={handleFavoriteToggle}
                    sx={{ ml: 2 }}
                    color={isFav ? 'error' : 'default'}
                  >
                    {isFav ? <Favorite fontSize="large" /> : <FavoriteBorder fontSize="large" />}
                  </IconButton>
                </Tooltip>
              </Box>

              {movie.tagline && (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ mb: 2, fontStyle: 'italic' }}
                >
                  "{movie.tagline}"
                </Typography>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
                {releaseDate && (
                  <Typography variant="body1" color="text.secondary">
                    {formattedDate}
                  </Typography>
                )}
                
                {movie.runtime && (
                  <>
                    <Divider orientation="vertical" flexItem />
                    <Typography variant="body1" color="text.secondary">
                      {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                    </Typography>
                  </>
                )}
                
                {movie.vote_average > 0 && (
                  <>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating
                        value={movie.vote_average / 2}
                        precision={0.5}
                        readOnly
                        icon={<Star color="warning" />}
                        emptyIcon={<Star color="action" />}
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {movie.vote_average.toFixed(1)}/10
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                {movie.genres && movie.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    sx={{ mr: 1, mb: 1 }}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>

              <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {movie.overview || 'No overview available.'}
              </Typography>

              {trailerKey && (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<YouTubeIcon />}
                  onClick={() => {
                    window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
                  }}
                  sx={{ mt: 2 }}
                >
                  Watch Trailer
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>

        {/* Cast section */}
        {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                position: 'relative',
                pb: 1,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 50,
                  height: 3,
                  backgroundColor: 'primary.main',
                  borderRadius: 1,
                },
              }}
            >
              Top Cast
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto',
                py: 2,
                gap: 2,
                '&::-webkit-scrollbar': {
                  height: 8,
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f1f1f1',
                  borderRadius: 4,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#666' : '#888',
                  borderRadius: 4,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#999' : '#555',
                  },
                },
              }}
            >
              {movie.credits.cast.slice(0, 10).map((actor) => (
                <Card key={actor.id} sx={{ minWidth: 140, maxWidth: 140, borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : 'https://via.placeholder.com/185x278?text=No+Image'
                    }
                    alt={actor.name}
                  />
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography variant="body2" component="div" fontWeight="bold" noWrap>
                      {actor.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {actor.character}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* YouTube trailer embed */}
        {trailerKey && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                position: 'relative',
                pb: 1,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 50,
                  height: 3,
                  backgroundColor: 'primary.main',
                  borderRadius: 1,
                },
              }}
            >
              Trailer
            </Typography>
            
            <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
              <Box
                component="iframe"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title={`${title} Trailer`}
                allowFullScreen
                frameBorder="0"
                sx={{
                  width: '100%',
                  height: { xs: '240px', sm: '360px', md: '480px' },
                  display: 'block',
                }}
              />
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MovieDetails;