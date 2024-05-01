import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        password: '',
        email: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [showResponse, setShowResponse] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/cash/users/signup', formData);
            setResponseMessage(response.data); 
            setShowResponse(true); 
            setTimeout(() => {
                setShowResponse(false); 
            }, 1000);
            if(response.data === "User registered successfully") {
                navigate('/'); // Use navigate for routing
            }
        } catch (error) {
            console.error('Failed to register user', error);
            setResponseMessage('Failed to register user. Please try again.');
            setShowResponse(true);
            setTimeout(() => {
                setShowResponse(false); 
            }, 1500);
        }
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #262626 0%, #474747 100%)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Container maxWidth="sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
                <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Mobile Number"
                        variant="outlined"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
                </form>
                {showResponse && (
                    <Typography
                        variant="body1"
                        align="center"
                        style={{
                            marginTop: '10px',
                            animation: 'highlight 3s ease-in-out', // CSS animation
                            backgroundColor: '#ffd700', // Yellow background for highlighting
                        }}
                    >
                        {responseMessage}
                    </Typography>
                )}
                <Typography variant="body1" align="center" style={{ marginTop: '10px' }}>
                    Already have an account? <Link to="/">Login</Link>
                </Typography>
            </Container>
        </div>
    );
}

export default SignUp;
