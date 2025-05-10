import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";


export interface Movie {
    id: number;
    title?: string;
    name?: string; // For TV shows
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    overview: string;
    release_date?: string;
    first_air_date?: string; // For TV shows
    media_type?: string;
    genre_ids: number[];
}

export interface MovieDetails extends Movie {
    genres: { id: number; name: string }[];
    runtime?: number;
    tagline?: string;
    videos?: {
        results: {
            id: string;
            key: string;
            name: string;
            site: string;
            type: string;
        }[];
    };
    credits?: {
        cast: {
            id: number;
            name: string;
            profile_path: string | null;
            character: string;
        }[];
    };
}

export interface MovieContextType {
    trendingMovies: Movie[];
    searchResults: Movie[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchMovies: (query: string) => Promise<void>;
    fetchMovieDetails: (id: number) => Promise<MovieDetails | null>;
    favoriteMovies: Movie[];
    addToFavorites: (movie: Movie) => void;
    removeFromFavorites: (id: number) => void;
    isFavorite: (id: number) => boolean;
    lastSearchedMovies: Movie[];
    loadMoreTrending: () => Promise<void>;
    loadMoreSearch: () => Promise<void>;
    resetSearchResults: () => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

//API coonfiguration
const API_BASE_URL = import.meta.env.API_BASE_URL;
const ACCESS_TOKEN = import.meta.env.ACCESS_TOKEN;

// api request headers
const apiHeaders = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
};

export const useMovies = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovies must be used within a MovieProvider');
    }
    return context;
};

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
    const [lastSearchedMovies, setLastSearchedMovies] = useState<Movie[]>([]);
    const [trendingPage, setTrendingPage] = useState(1);
    const [searchPage, setSearchPage] = useState(1);
    const [hasMoreTrending, setHasMoreTrending] = useState(true);
    const [hasMoreSearch, setHasMoreSearch] = useState(true);

    // load favuorite movies from locall storage
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoriteMovies');
        if (savedFavorites) {
            try {
                setFavoriteMovies(JSON.parse(savedFavorites));
            } catch (e) {
                console.error('Error parsing favorites:', e);
            }
        }

        // last search movies
        const lastSearched = localStorage.getItem('lastSearchedMovies');
        if (lastSearched) {
            try {
                setLastSearchedMovies(JSON.parse(lastSearched));
            } catch (e) {
                console.error('Error parsing last searched movies:', e);
            }
        }

        const lastQuery = localStorage.getItem('lastSearchQuery');
        if (lastQuery) {
            setSearchQuery(lastQuery);
        }

        //fetch trending movies on first load....
        fetchTrendingMovies();

    }, []);

    // Save favorites to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    }, [favoriteMovies]);

    // Save last searched movies to localStorage
    useEffect(() => {
        if (lastSearchedMovies.length > 0) {
            localStorage.setItem('lastSearchedMovies', JSON.stringify(lastSearchedMovies));
        }
    }, [lastSearchedMovies]);

    // Save last search query to localStorage
    useEffect(() => {
        if (searchQuery) {
            localStorage.setItem('lastSearchQuery', searchQuery);
        }
    }, [searchQuery]);


    // fetch movies
    const fetchTrendingMovies = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/trending/all/week`, {
        headers: apiHeaders,
        params: { page },
      });
      
      const movies = response.data.results;
      
      if (page === 1) {
        setTrendingMovies(movies);
      } else {
        setTrendingMovies((prev) => [...prev, ...movies]);
      }
      
      setHasMoreTrending(response.data.page < response.data.total_pages);
      setTrendingPage(response.data.page);
    } catch (err) {
      setError('Failed to fetch trending movies');
      console.error('Error fetching trending movies:', err);
    } finally {
      setLoading(false);
    }
  };
}
