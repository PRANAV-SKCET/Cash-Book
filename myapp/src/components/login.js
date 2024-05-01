import { Button, TextField, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from './context';

function Login() {
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const { setIsLoggedIn,mobileNumber, setMobileNumber } = useContext(AuthContext); // Get setMobileNumber from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/cash/users/login', null, {
        params: {
          mobileNumber: mobileNumber, // Use mobileNumber from state
          password: password
        }
      });

      if (response.data === "Login successful") {
        setIsLoggedIn(true);
        navigate('/cashbook'); 
      } else {
        setResponseMessage(response.data);
        setShowResponse(true);
        setTimeout(() => {
          setShowResponse(false);
        }, 1500);
      }

    } catch (error) {
      console.error('Error logging in:', error);
      setResponseMessage('Error logging in. Please try again.');
      setShowResponse(true);
      setTimeout(() => {
        setShowResponse(false);
      }, 1500);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(45deg, #212121 30%, #424242 90%)'
    }}>
      <Container component="main" maxWidth="xs" style={{
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        background: 'rgba(255, 255, 255, 0.8)'
      }}>
        <Typography component="h1" variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobileNumber"
            label="Mobile Number"
            name="mobileNumber"
            autoComplete="tel"
            autoFocus
            onChange={(e) => setMobileNumber(e.target.value)} // Set mobileNumber in context
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Sign In
          </Button>
        </form>
        {showResponse && (
          <Typography
            variant="body1"
            align="center"
            style={{
              marginTop: '10px',
              animation: 'highlight 3s ease-in-out', // CSS animation
              backgroundColor: '#D04848', // Yellow background for highlighting
            }}
          >
            {responseMessage}
          </Typography>
        )}
        <Link to="/signup" style={{ display: 'block', textAlign: 'center', marginTop: '16px', color: '#333', textDecoration: 'none' }}>
          Don't have an account? Sign Up
        </Link>
      </Container>
    </div>
  );
}

export default Login;
