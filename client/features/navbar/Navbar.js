import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import AdbIcon from '@mui/icons-material/Adb';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
import AuthForm from '../auth/AuthForm';

const links = [
  { label: 'Home', to: '/home' },
  { label: 'Patience', to: '/patience' },
  { label: 'Charisma', to: '/charisma' },
  { label: 'Attitude', to: '/attitude' },
  { label: 'Discipline', to: '/discipline' },
];

const settings = ['Profile', 'Account', 'Your Cart', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [displayLoginForm, setDisplayLoginForm] = React.useState(false);
  const [displaySignupForm, setDisplaySignupForm] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleLoginButtonClick = () => {
    setDisplayLoginForm(!displayLoginForm);
  };

  const handleSignupButtonClick = () => {
    setDisplaySignupForm(!displaySignupForm);
  };

  const handleDropdownClick = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {links.map((link) => (
                <MenuItem key={link.to} component={Link} to={link.to} onClick={handleCloseNavMenu}>
                  {link.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {links.map((link) => (
              <Button key={link.to} component={Link} to={link.to} sx={{ mx: 2, color: 'white' }}>
                {link.label}
              </Button>
            ))}
            {!isLoggedIn && (
              <>
                <Button
                  onClick={handleLoginButtonClick}
                  variant="contained"
                  color="secondary"
                  sx={{ mx: 2 }}
                >
                  Login
                </Button>
                <Button
                  onClick={handleSignupButtonClick}
                  variant="contained"
                  color="secondary"
                  sx={{ mx: 2 }}
                >
                  Sign Up
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                onClick={logoutAndRedirectHome}
                variant="contained"
                color="secondary"
                sx={{ mx: 2 }}
              >
                Logout
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      {displayLoginForm && (
        <Popover
          open={displayLoginForm}
          anchorEl={document.getElementById('login-button')}
          onClose={handleLoginButtonClick}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            sx: { p: '10px', maxWidth: '300px' },
          }}
        >
          <AuthForm
            name="login"
            displayName="Login"
            handleCloseForm={handleLoginButtonClick}
          />
        </Popover>
      )}
      {displaySignupForm && (
        <Popover
          open={displaySignupForm}
          anchorEl={document.getElementById('signup-button')}
          onClose={handleSignupButtonClick}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            sx: { p: '10px', maxWidth: '300px' },
          }}
        >
          <AuthForm
            name="signup"
            displayName="Sign Up"
            handleCloseForm={handleSignupButtonClick}
          />
        </Popover>
      )}
      {openDropdown && (
        <Popover
          open={openDropdown}
          anchorEl={document.getElementById('dropdown-button')}
          onClose={handleDropdownClick}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: { p: '10px', maxWidth: '200px' },
          }}
        >
          <Box sx={{ p: '10px' }}>
            <Typography>Input Box 1</Typography>
            <input type="text" />
            <Typography>Input Box 2</Typography>
            <input type="text" />
          </Box>
        </Popover>
      )}
    </AppBar>
  );
}

export default ResponsiveAppBar;
