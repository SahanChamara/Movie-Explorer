import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  InputBase, 
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { styled, useTheme as useMuiTheme } from '@mui/material/styles';
import { 
  Search as SearchIcon, 
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  AccountCircle,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Movie as MovieIcon
} from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === 'light' 
    ? 'rgba(0,0,0,0.04)' 
    : 'rgba(255,255,255,0.05)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(0,0,0,0.08)' 
      : 'rgba(255,255,255,0.1)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const { searchQuery, setSearchQuery, searchMovies, resetSearchResults } = useMovies();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery);
      searchMovies(localSearchQuery);
      navigate('/search');
    }
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    closeMobileMenu();
  };

  const renderMobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={closeMobileMenu}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
      >
        <List>
          <ListItem sx={{ justifyContent: 'center', py: 2 }}>
            <Typography variant="h6" component="div">
              <MovieIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Movie Explorer
            </Typography>
          </ListItem>
          <Divider />
          <ListItem button onClick={() => navigateTo('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => navigateTo('/favorites')}>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>
          <Divider />
          <ListItem button onClick={toggleTheme}>
            <ListItemIcon>
              {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
            </ListItemIcon>
            <ListItemText primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} />
          </ListItem>
          {isAuthenticated && (
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {
        handleMenuClose();
        navigate('/favorites');
      }}>
        <FavoriteIcon sx={{ mr: 1 }} /> My Favorites
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <LogoutIcon sx={{ mr: 1 }} /> Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 600,
              mr: 2,
            }}
            onClick={() => resetSearchResults()}
          >
            <MovieIcon sx={{ mr: 1 }} />
            Movie Explorer
          </Typography>

          <Box sx={{ flexGrow: { xs: 1, md: 0 } }}>
            <form onSubmit={handleSearchSubmit}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search movies..."
                  inputProps={{ 'aria-label': 'search' }}
                  value={localSearchQuery}
                  onChange={handleSearchChange}
                />
              </Search>
            </form>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{ mx: 1 }}
                onClick={() => resetSearchResults()}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/favorites"
                sx={{ mx: 1 }}
              >
                Favorites
              </Button>
              <Tooltip title={`Toggle ${mode === 'dark' ? 'light' : 'dark'} mode`}>
                <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
                  {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="body1"
                sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}
              >
                {user?.username}
              </Typography>
              <Tooltip title="Account">
                <IconButton
                  edge="end"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    {user?.username.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              variant="outlined"
              sx={{ ml: 1 }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu()}
      <Toolbar /> {/* This is to offset the fixed AppBar */}
    </>
  );
};

export default NavBar;