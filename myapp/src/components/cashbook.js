import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './context';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import '../App.css';

function CashBook() {
    const [cardName, setCardName] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [showResponse, setShowResponse] = useState(false);
    const [cards, setCards] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [cardToDelete, setCardToDelete] = useState(null);
    const { mobileNumber, cardNameAuth, setCardNameAuth } = useContext(AuthContext);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/cards?mobileNumber=${mobileNumber}`);
            setCards(response.data);
        } catch (error) {
            console.error('Failed to fetch cards:', error);
        }
    };

    const handleAddCard = async (e) => {
        e.preventDefault();
        try {
            const currentDate = new Date().toLocaleDateString();
            const payload = {
                cardName: cardName,
                cardDate: currentDate,
                mobileNumber: mobileNumber,
                balance: 0
            };
            const response = await axios.post('http://localhost:8080/addcards', payload);
            setResponseMessage(response.data);
            setShowResponse(true);
            setTimeout(() => {
                setShowResponse(false);
            }, 1000);
            setCardName('');
            fetchCards(); // Refresh the cards list after adding a new card
        } catch (error) {
            setResponseMessage('Failed to add card. Please try again.');
            setShowResponse(true);
            setTimeout(() => {
                setShowResponse(false);
            }, 1500);
        }
    };

    const handleDeleteConfirmation = (cardId) => {
        setCardToDelete(cardId);
        setConfirmDelete(true);
    };

    const handleDeleteCancel = () => {
        setConfirmDelete(false);
        setCardToDelete(null);
    };

    const handleDeleteConfirm = async () => {
        if (cardToDelete) {
            try {
                const response = await axios.delete(`http://localhost:8080/cards/${cardToDelete}/${mobileNumber}`);
                setResponseMessage(response.data);
                setShowResponse(true);
                setTimeout(() => {
                    setShowResponse(false);
                }, 1000);
                fetchCards(); // Refresh the cards list after deleting a card
            } catch (error) {
                setResponseMessage('Failed to delete card. Please try again.');
                setShowResponse(true);
                setTimeout(() => {
                    setShowResponse(false);
                }, 1500);
            }
            setConfirmDelete(false);
            setCardToDelete(null);
        }
    };

    const handleCardClick = (cardName) => {
        setCardNameAuth(cardName);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>Add Card</Typography>
            <form onSubmit={handleAddCard}>
                <TextField
                    fullWidth
                    label="Card Name"
                    variant="outlined"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Add Card</Button>
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
            <Typography variant="h5" align="center" gutterBottom>My Cards</Typography>
            {cards.map((card, index) => (
                <div key={index} className="cardContainer">
                    <Link to={`/transaction`} style={{ textDecoration: 'none' }} onClick={() => handleCardClick(card.cardName)}>
                        <div className="card">
                            <div className="cardContent">
                                <Typography variant="body1">{card.cardName}</Typography>
                                <Typography variant="body2">Balance: {card.balance}</Typography>
                            </div>
                        </div>
                    </Link>
                    <IconButton onClick={() => handleDeleteConfirmation(card.cardName)} className="deleteButton">
                        <DeleteIcon />
                    </IconButton>
                </div>
            ))}
            <Dialog open={confirmDelete} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to delete this card?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirm} color="error">Yes</Button>
                    <Button onClick={handleDeleteCancel} color="secondary">No</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default CashBook;
