# 🎬 Movie Explorer: Discover Your Favorite Films

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-brightgreen)](https://your-vercel-deployment-url.vercel.app)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://hub.docker.com/r/yourusername/movie-explorer)
[![React](https://img.shields.io/badge/React-v18-blue)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/MUI-v5-purple)](https://mui.com/)
[![TMDb API](https://img.shields.io/badge/TMDb-API-orange)](https://developers.themoviedb.org/3)

> A modern, responsive web application for movie enthusiasts to explore, search, and save their favorite films with an intuitive user interface and comprehensive filtering options.

## ✨ Features

### Core Features
- **User Authentication**
  - Secure login system with username and password
  - Protected routes for authenticated users
  - Persistent sessions using local storage

- **Movie Discovery**
  - Browse trending movies on the homepage
  - Search functionality with real-time results
  - Detailed view with comprehensive movie information
  - "Load More" button for browsing additional results

- **User Experience**
  - Responsive design with mobile-first approach
  - Toggle between light and dark modes
  - User-friendly error handling and loading states
  - Intuitive navigation with React Router

### Advanced Features
- **Enhanced Filtering**
  - Filter movies by genre categories
  - Filter by release date range
  - Filter by rating range (1-10)
  - Combine multiple filters for refined searches

- **Favorites Management**
  - Save favorite movies to a personalized list
  - Persistent favorites using local storage
  - Remove movies from favorites
  - Protected favorites page for authenticated users

- **Rich Media Integration**
  - YouTube trailer integration
  - High-quality movie posters and backdrops
  - Detailed cast information

## 🛠️ Technologies Used

### Frontend
- **React.js** - Frontend library for building the user interface
- **Context API** - State management solution
- **React Router v6** - For navigation and routing
- **Material UI** - Component library for consistent design
- **Axios** - HTTP client for API requests

### APIs
- **TMDb API** - For movie data, search, and details

### Storage & Persistence
- **Local Storage** - For saving user preferences, favorites, and authentication state

### Deployment & Containerization
- **Vercel** - For production deployment and hosting
- **Docker** - For containerization and environment consistency

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/movie-explorer.git
   cd movie-explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create environment variables:**
   
   Create a `.env` file in the root directory with the following:
   ```
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key
   REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
   ```

4. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser:** Navigate to `http://localhost:5173`

### Docker Deployment

1. **Build the Docker image:**
   ```bash
   docker build -t movie-explorer .
   ```

2. **Run the container:**
   ```bash
   docker run -p 5173:5173 movie-explorer
   ```

3. **Access the application:** Navigate to `http://localhost:5173`

## 📂 Project Structure

```
movie-explorer/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── components/
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieList.jsx
│   │   │   ├── Navbar.jsx
│   ├── context/
│   │   ├── AuthProvider.jsx
│   │   ├── MovieProvider.jsx
│   │   └── ThemeProvider.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── SearchResults.jsx
│   │   └── Favorites.jsx
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── .gitignore
├── Dockerfile
├── package.json
└── README.md
```

## 🔑 API Integration

### TMDb API
This project uses The Movie Database (TMDb) API to fetch movie data. To use this API:

1. Register for an API key at [TMDb Developer](https://developers.themoviedb.org/3/getting-started/introduction)
2. Add your API key to the `.env` file as shown in the Installation section

The application uses the following TMDb endpoints:
- `/trending/movie/week` - For trending movies

### YouTube API
For movie trailers, the application integrates with the YouTube API:

## 🧪 Development

### State Management with Context API
The application uses React Context API for state management with three main contexts:
- `AuthContext` - Manages user authentication state
- `MovieContext` - Handles movie data, search results, and filtering
- `ThemeContext` - Controls the application's theme (light/dark mode)

### Local Storage Implementation
The application stores the following data in the browser's local storage:
- User authentication status
- User's favorite movies
- Theme preference (light/dark)
- Last search query

## User Login
- username - user1
- password - password1

## 🚢 Deployment

### Vercel Deployment
The application is deployed on Vercel. To deploy your own instance:

1. Push your code to a GitHub/GitLab repository
2. Import the repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Docker Deployment
The application can also be run as a Docker container:

1. Build the image using the included Dockerfile
2. Run the container and map the appropriate ports
3. Access the application through the mapped port

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the movie data API
- [Material-UI](https://mui.com/) for the component library
- [React](https://reactjs.org/) and its community for the excellent documentation and resources
- [Vercel](https://vercel.com/) for the hosting platform

---

Made with ❤️ by [Sahan Chamara](https://github.com/SahanChamara)
