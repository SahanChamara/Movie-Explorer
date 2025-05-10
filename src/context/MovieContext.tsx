import { createContext } from "react";


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


