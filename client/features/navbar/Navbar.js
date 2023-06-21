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
import LoginForm from '../auth/LoginForm';

const links = [
  { label: 'Home', to: '/home' },
  { label: 'Patience', to: '/patience' },
  { label: 'Charisma', to: '/charisma' },
  { label: 'Attitude', to: '/attitude' },
  { label: 'Discipline', to: '/discipline' },
];

const settings = ['Your Cart', 'Logout'];

function ResponsiveAppBar() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [displayLoginForm, setDisplayLoginForm] = React.useState(false);
  const [displaySignupForm, setDisplaySignupForm] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setIsOpen(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setIsOpen(false);
  };

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/home');
  };

  const handleLoginButtonClick = () => {
    setDisplayLoginForm(!displayLoginForm);
    setIsModalOpen(true);
  };

  const handleSignupButtonClick = () => {
    setDisplaySignupForm(!displaySignupForm);
    setIsModalOpen(true);
  };

  const handleSettingsItemClick = (setting) => {
    setIsOpen(false);
    if (setting === 'Logout') {
      logoutAndRedirectHome();
    } else if (setting === 'Your Cart') {
      navigate('/cart');
      handleCloseUserMenu();
    }
  };

  return (
<<<<<<< HEAD
    <div>
      <h1>FS-App-Template</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to='/products'>Products</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};
=======
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isLoggedIn && (
            <AdbIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "darkgrey",
              }}
            />
          )}
>>>>>>> master

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu>
              {links.map((link) => (
                <MenuItem
                  key={link.to}
                  component={Link}
                  to={link.to}
                  // onClick={handleCloseNavMenu}
                >
                  {link.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {links.map((link) => (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                sx={{ mx: 2, color: "white" }}
              >
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
          </Box>

          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                keepMounted
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={isOpen}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => {
                  switch (setting) {
                    case "Your Cart":
                      return (
                        <MenuItem component={Link} to="/cart" key={setting}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      );

                    case "Logout":
                      return (
                        <MenuItem
                          key={setting}
                          onClick={() => handleSettingsItemClick(setting)}
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      );

                    default:
                      return (
                        <MenuItem
                          key={setting}
                          onClick={() => handleSettingsItemClick(setting)}
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      );
                  }
                })}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
      {displayLoginForm && (
        <Popover
          open={displayLoginForm}
          anchorEl={document.getElementById("login-button")}
          onClose={handleLoginButtonClick}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            sx: { p: "10px", maxWidth: "300px" },
          }}
        >
          <LoginForm
            name="login"
            displayName="Login"
            handleCloseForm={handleLoginButtonClick}
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Popover>
      )}
      {displaySignupForm && (
        <Popover
          open={displaySignupForm}
          anchorEl={document.getElementById("signup-button")}
          onClose={handleSignupButtonClick}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            sx: { p: "10px", maxWidth: "300px" },
          }}
        >
          <AuthForm
            name="signup"
            displayName="Sign Up"
            handleCloseForm={handleSignupButtonClick}
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Popover>
      )}
    </AppBar>
  );
}

export default ResponsiveAppBar;
