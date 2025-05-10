import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  IconButton,
  Collapse,
} from '@mui/material';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import MovieList from '../components/MovieList';
import { useMovies } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

const currentYear = new Date().getFullYear();
const yearRange = Array.from({ length: 50 }, (_, i) => currentYear - i);

const Home: React.FC = () => {
  const { 
    trendingMovies, 
    loading, 
    error, 
    lastSearchedMovies,
    loadMoreTrending,
  } = useMovies();
  
  const { isAuthenticated, user } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [yearFilter, setYearFilter] = useState<number>(currentYear);
  const [ratingRange, setRatingRange] = useState<number[]>([0, 10]);

  // Filter movies based on selected criteria
  const filteredMovies = trendingMovies.filter(movie => {
    const movieYear = new Date(movie.release_date || movie.first_air_date || '').getFullYear();
    const matchesYear = !yearFilter || movieYear === yearFilter;
    const matchesRating = movie.vote_average >= ratingRange[0] && movie.vote_average <= ratingRange[1];
    const matchesGenres = selectedGenres.length === 0 || 
      movie.genre_ids.some(id => selectedGenres.includes(id));

    return matchesYear && matchesRating && matchesGenres;
  });

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres(prev => 
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <Container maxWidth="xl">
      {isAuthenticated && (
        <Box sx={{ my: 4 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 2, 
              bgcolor: 'background.paper',
              backgroundImage: (theme) => 
                theme.palette.mode === 'light' 
                  ? 'linear-gradient(120deg, #e0f7fa 0%, #e8f5e9 100%)' 
                  : 'linear-gradient(120deg, #263238 0%, #1a237e 100%)',
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Welcome back, {user?.username}!
            </Typography>
            <Typography variant="body1">
              Discover the latest trending movies and TV shows, or search for your favorites.
            </Typography>
          </Paper>
        </Box>
      )}

      {/* Filters Section */}
      <Paper 
        sx={{ 
          mb: 4, 
          p: 2,
          borderRadius: 2,
          background: (theme) => 
            theme.palette.mode === 'light'
              ? 'linear-gradient(to right, #f5f5f5, #ffffff)'
              : 'linear-gradient(to right, #1a1a1a, #2d2d2d)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Filter size={24} /> Filters
          </Typography>
          <IconButton onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </Box>

        <Collapse in={showFilters}>
          <Grid container spacing={3}>
            {/* Genre Filter */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Genres
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {genres.map(genre => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    onClick={() => handleGenreToggle(genre.id)}
                    color={selectedGenres.includes(genre.id) ? "primary" : "default"}
                    sx={{ 
                      '&:hover': { 
                        transform: 'translateY(-2px)',
                        transition: 'transform 0.2s',
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>

            {/* Year Filter */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Release Year</InputLabel>
                <Select
                  value={yearFilter}
                  label="Release Year"
                  onChange={(e) => setYearFilter(Number(e.target.value))}
                >
                  <MenuItem value={0}>All Years</MenuItem>
                  {yearRange.map(year => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Rating Filter */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Rating Range: {ratingRange[0]} - {ratingRange[1]}
              </Typography>
              <Slider
                value={ratingRange}
                onChange={(_, newValue) => setRatingRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={10}
                step={0.5}
                marks={[
                  { value: 0, label: '0' },
                  { value: 5, label: '5' },
                  { value: 10, label: '10' },
                ]}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Paper>

      {lastSearchedMovies.length > 0 && (
        <MovieList
          title="Recently Searched"
          movies={lastSearchedMovies}
          emptyMessage="Your recent searches will appear here."
        />
      )}

      <MovieList
        title="Trending This Week"
        movies={filteredMovies}
        loading={loading}
        error={error}
        emptyMessage={
          filteredMovies.length === 0 && trendingMovies.length > 0
            ? "No movies match the selected filters."
            : "No trending movies found."
        }
        onLoadMore={loadMoreTrending}
        hasMore={true}
      />
    </Container>
  );
};

export default Home;