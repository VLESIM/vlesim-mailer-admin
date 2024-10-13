import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Popover,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Notifications } from '../Notifications/Notifications.tsx';

interface DecodedToken {
  username: string;
  exp: number;
}

const NavBar = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);

        setUserName(decoded.username);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleClickUserName = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleCloseUserName = () => {
    setUserAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    setUserName(null);
    handleCloseUserName();
  };

  const openUserPopover = Boolean(userAnchorEl);
  const userPopoverId = openUserPopover ? 'user-popover' : undefined;

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#24244A', color: '#000' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant="h1"
            sx={{ fontWeight: 'bold', fontSize: '26px', color: '#fff' }}
          >
            <span style={{ color: '#1DD63A' }}>VLESIM</span> MAILER
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body1"
            sx={{ marginRight: '16px', color: '#929ECC', cursor: 'pointer' }}
            onClick={handleClickUserName}
          >
            {userName ? userName : 'No User Logged In'}
          </Typography>

          <Notifications />
        </Box>
      </Toolbar>

      <Popover
        id={userPopoverId}
        open={openUserPopover}
        anchorEl={userAnchorEl}
        onClose={handleCloseUserName}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Log Out
          </Button>
        </Box>
      </Popover>
    </AppBar>
  );
};

export default NavBar;
