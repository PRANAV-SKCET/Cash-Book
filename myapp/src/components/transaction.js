import { Button, Modal, TextField, Box, Typography, Select, MenuItem, FormControl, InputLabel, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css';

export default function Transaction() {
    const { mobileNumber, cardNameAuth } = useContext(AuthContext);
    const [type, setType] = useState('');
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [balance, setBalance] = useState('');
    const [remarks, setRemarks] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [transactions, setTransactions] = useState([]);
    
    // Editable transaction state variables
    const [editTransactionId, setEditTransactionId] = useState(null);
    const [editAmount, setEditAmount] = useState('');
    const [editRemarks, setEditRemarks] = useState('');
    const [editPaymentMode, setEditPaymentMode] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        // Reset editable transaction state variables
        setEditTransactionId(null);
        setEditAmount('');
        setEditRemarks('');
        setEditPaymentMode('');
    };

    const handleAmountChange = (event) => setAmount(event.target.value);
    const handleRemarksChange = (event) => setRemarks(event.target.value);
    const handlePaymentModeChange = (event) => setPaymentMode(event.target.value);
    const handleEditAmountChange = (event) => setEditAmount(event.target.value);
    const handleEditRemarksChange = (event) => setEditRemarks(event.target.value);
    const handleEditPaymentModeChange = (event) => setEditPaymentMode(event.target.value);

    const addCashOut = () => { setType("Cash-Out"); handleOpen(); };
    const addCashIn = () => { setType("Cash-In"); handleOpen(); };

    useEffect(() => {
        fetchBalance();
        fetchTransactions();
    }, []);

    const fetchBalance = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getBalance/${cardNameAuth}/${mobileNumber}`);
            setBalance(response.data);
        } catch (error) {
            console.error('Failed to fetch Balance', error);
        }
    };

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getTransaction/${cardNameAuth}/${mobileNumber}`);
            setTransactions(response.data);
        } catch (error) {
            console.error('Failed to fetch Transactions', error);
        }
    };

    const currentDate = new Date(); // Get current date and time
    const date = currentDate.toISOString().split('T')[0]; // Extract date part
    const time = currentDate.toTimeString().split(' ')[0]; // Extract time part
    const addToTable = () => {

        const transactionData = {
            mobileNumber: mobileNumber,
            cardName: cardNameAuth,
            type: type,
            amount: amount,
            remarks: remarks,
            mode: paymentMode,
            date: date,
            time: time
        };

        axios.post('http://localhost:8080/addTransaction', transactionData)
            .then(response => {
                fetchBalance();
                fetchTransactions();
            })
            .catch(error => {
                // Handle error
                console.error('Error adding transaction:', error);
            });

        setAmount('');
        setRemarks('');
        setPaymentMode('');
        handleClose();
    };

    const deleteTransaction = async (transactionId) => {
        try {
            await axios.delete(`http://localhost:8080/deleteTransaction/${transactionId}/${mobileNumber}/${cardNameAuth}`);
            fetchTransactions();
            fetchBalance();
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    const editTransaction = (transactionId) => {
        const transactionToEdit = transactions.find(transaction => transaction.id === transactionId);
        setEditTransactionId(transactionId);
        setEditAmount(transactionToEdit.amount);
        setEditRemarks(transactionToEdit.remarks);
        setEditPaymentMode(transactionToEdit.mode);
        setType(transactionToEdit.type); // Pre-fill the type field
        handleOpen();
    };

    const updateTransaction = () => {
        const editedTransactionData = {
            amount: editAmount,
            remarks: editRemarks,
            mode: editPaymentMode,
            type: type,
            cardName:cardNameAuth,
            mobileNumber:mobileNumber,
            date:date,
            time:time
        };

        axios.put(`http://localhost:8080/updateTransaction/${editTransactionId}/${mobileNumber}/${cardNameAuth}`, editedTransactionData)
            .then(response => {
                console.log(response.data);
                fetchTransactions();
                fetchBalance();
                handleClose();
            })
            .catch(error => {
                console.error('Error updating transaction:', error);
            });
    };

    return (
        <div>
            <Typography variant="body1" gutterBottom>
                Balance: {balance}
            </Typography>
            <Button onClick={addCashIn} color="success">Cash-In</Button>
            <Button onClick={addCashOut} color="error">Cash-Out</Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="transaction-modal" aria-describedby="transaction-modal-description">
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400, borderRadius: 4, textAlign: 'center' }}>
                    <Typography variant="h6" id="transaction-modal" gutterBottom>
                        {editTransactionId ? "Edit Transaction" : (type === "Cash-In" ? "Cash-In" : "Cash-Out")} Transaction
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
                        <Select
                            labelId="transaction-type-label"
                            id="transaction-type"
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                        >
                            <MenuItem value="Cash-In">Cash-In</MenuItem>
                            <MenuItem value="Cash-Out">Cash-Out</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="amount" label="Amount" variant="outlined" value={editTransactionId ? editAmount : amount} onChange={editTransactionId ? handleEditAmountChange : handleAmountChange} fullWidth margin="normal" />
                    <TextField id="remarks" label="Remarks" variant="outlined" value={editTransactionId ? editRemarks : remarks} onChange={editTransactionId ? handleEditRemarksChange : handleRemarksChange} fullWidth margin="normal" />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="payment-mode-label">Payment Mode</InputLabel>
                        <Select labelId="payment-mode-label" id="payment-mode" value={editTransactionId ? editPaymentMode : paymentMode} onChange={editTransactionId ? handleEditPaymentModeChange : handlePaymentModeChange}>
                            <MenuItem value="Cash">Cash</MenuItem>
                            <MenuItem value="Card">Card</MenuItem>
                            <MenuItem value="Online">Online</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={editTransactionId ? updateTransaction : addToTable} variant="contained" color="primary" sx={{ mt: 2 }}>{editTransactionId ? "Update Transaction" : "Add Transaction"}</Button>
                </Box>
            </Modal>
            <div>
                <Typography variant="h6" gutterBottom>
                    Transactions
                </Typography>
                <div className="transaction-list">
                    {transactions.map((transaction, index) => (
                        <div key={index} className="transaction-item">
                            <span>Type: {transaction.type}</span>
                            <span>Amount: {transaction.amount}</span>
                            <span>Remarks: {transaction.remarks}</span>
                            <span>Mode: {transaction.mode}</span>
                            <span>Date: {transaction.date}</span>
                            <span>Time: {transaction.time}</span>
                            <IconButton onClick={() => deleteTransaction(transaction.id)} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => editTransaction(transaction.id)} aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
