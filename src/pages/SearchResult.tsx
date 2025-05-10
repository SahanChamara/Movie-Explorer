import { Container, Typography, Box, Paper } from '@mui/material';
import { useMovies } from '../context/MovieContext';
import MovieList from '../components/MovieList';

const SearchResults: React.FC = () => {
  const { 
    searchResults, 
    searchQuery,
    loading, 
    error,
    loadMoreSearch,
  } = useMovies();

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        {searchQuery ? (
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              mb: 2, 
              borderRadius: 2,
              bgcolor: 'background.paper' 
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Search Results for "{searchQuery}"
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Found {searchResults.length} results
            </Typography>
          </Paper>
        ) : (
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              mb: 2, 
              borderRadius: 2,
              bgcolor: 'background.paper' 
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Search for a movie or TV show
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enter a search query in the search bar above
            </Typography>
          </Paper>
        )}

        <MovieList
          title="Results"
          movies={searchResults}
          loading={loading}
          error={error}
          emptyMessage={searchQuery ? "No results found. Try a different search term." : "Enter a search term to see results."}
          onLoadMore={loadMoreSearch}
          hasMore={true}
        />
      </Box>
    </Container>
  );
};

export default SearchResults;