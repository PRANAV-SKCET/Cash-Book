import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Link } from 'react-router-dom'
import { Avatar, Container, Button, Menu, MenuItem } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../App.css';
import { AuthContext } from './context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const profileClick = () => {
    navigate('/profile')
  };

  const logoutClick = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ flexGrow: 1, marginBottom: '80px' }}>
        <AppBar
          sx={{ background: 'linear-gradient(to bottom, #3983fa, #186df5)' }}
        >
          <Toolbar disableGutters>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              sx={{ width: '100vw' }}
            >
              <Box
                display={'flex'}
                justifyContent={'space-around'}
                alignItems={'center'}
                width={'45vw'}
                sx={{
                  '& > *:not(:last-child)': {
                    marginRight: '20px', // Set a fixed margin for all elements except the last one
                  },
                }}
              >
                <img
                  className="link logo"
                  src="/images/Cash Book_transparent.png"
                  alt='img'
                  width={'125px'}
                  height={'70px'}
                />
                <Link to="/cashbook" className="link-text" sx={{ textDecoration: 'none', fontSize: '1.2rem', color: 'white'}}>
                  Cash Book
                </Link>
                <Link to="/loan" className="link-text" sx={{ textDecoration: 'none', fontSize: '1.2rem', color: 'white'}}>
                  Loans
                </Link>
                <Link to="/report" className="link-text" sx={{ textDecoration: 'none', fontSize: '1.2rem', color: 'white'}}>
                  Report
                </Link>
                <Link to="/contact" className='link-text' sx={{ textDecoration: 'none', fontSize: '1.2rem', color: 'white' }}>
                  Contact us
                </Link>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'space-around'}
                alignItems={'center'}
                width={'10vw'}
              >
                <Button onClick={handleMenuOpen}>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                  <ArrowDropDownIcon sx={{ color: 'black'}} />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      border: '1px solid black', // Add border
                    },
                  }}
                >



                  <MenuItem onClick={profileClick} sx={{
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.25 )', // Change background color on hover
      },
    }}>Profile</MenuItem>



                  <MenuItem onClick={logoutClick}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.25 )', // Change background color on hover
                    },
                  }}>Logout</MenuItem>




                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
    </div>
  )
}

export default Navbar;
