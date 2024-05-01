import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';
import { AuthContext } from './context'; // Assuming you have the AuthContext

function Profile() {
    const { mobileNumber } = useContext(AuthContext); // Access mobile number from AuthContext
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        password: '',
        email: ''
    });
    const [responseMessage, setResponseMessage] = useState('');

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/cash/users/profile?mobileNumber=${mobileNumber}`);
            setUserData(response.data);
        } catch (error) {
            console.error('Failed to fetch user data', error);
        }
    };

    useEffect(() => {
        // Fetch user details when the component mounts
        fetchUserData();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:8080/cash/users/profile', userData);
            setResponseMessage('Update Success');
            // Optionally, handle success message or any other logic
        } catch (error) {
            console.error('Failed to update user data', error);
            setResponseMessage('Update Failed. Please try again.');
        }
    };

    return (
        <div>
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom>Profile</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Mobile Number"
                        variant="outlined"
                        name="mobileNumber"
                        value={userData.mobileNumber}
                        onChange={handleChange}
                        margin="normal"
                        disabled // Disable editing of mobile number
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="password"
                        value={userData.password}
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
                        value={userData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">Save</Button>
                </form>
                {responseMessage && (
                    <Typography variant="body1" align="center" style={{ marginTop: '10px' }}>
                        {responseMessage}
                    </Typography>
                )}
            </Container>
        </div>
    );
}

export default Profile;
