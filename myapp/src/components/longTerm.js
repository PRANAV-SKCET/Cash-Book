import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from "./context";
import { Delete as DeleteIcon } from '@mui/icons-material';
import '../App.css';
import emailjs from 'emailjs-com'; // Import EmailJS library

function LongTerm() {
    const { mobileNumber } = useContext(AuthContext);
    const [bankName, setBankName] = useState('');
    const [loanName, setLoanName] = useState('');
    const [loanNumber, setLoanNumber] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [pendingAmount, setPendingAmount] = useState('');
    const [renewableDate, setRenewableDate] = useState('');
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(null);
    const [editId, setEditId] = useState(null); // Track the id of the loan being edited

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        // Fetch all cards data from the database when component mounts
        axios.get(`http://localhost:8080/getLongTermLoans/${mobileNumber}`)
            .then(response => {
                console.log(response.data); // handle success
                setCards(response.data);
            })
            .catch(error => {
                console.error('Error fetching cards:', error); // handle error
                setError('Error fetching cards. Please try again.');
            });
    };

    const addCard = () => {
        const newCard = {
            bankName,
            loanName,
            loanNumber,
            loanAmount,
            pendingAmount,
            renewableDate,
            mobileNumber
        };

        axios.post('http://localhost:8080/addLongTermLoan', newCard)
            .then(response => {
                fetchLoans();
                setCards(prevCards => [...prevCards, response.data]);
                // Clear form fields
                clearForm();
                setError(null);
            })
            .catch(error => {
                console.error('Error adding card:', error); // handle error
                setError('Error adding card. Please try again.');
            });
    };

    const editLoan = (id) => {
        setEditId(id); // Set the id of the loan being edited
        const cardToEdit = cards.find(card => card.id === id);
        if (cardToEdit) {
            setBankName(cardToEdit.bankName);
            setLoanName(cardToEdit.loanName);
            setLoanNumber(cardToEdit.loanNumber || '');
            setLoanAmount(cardToEdit.loanAmount);
            setPendingAmount(cardToEdit.pendingAmount);
            setRenewableDate(cardToEdit.renewableDate);
        }
    };

    const saveEditedLoan = () => {
        const editedCard = {
            bankName,
            loanName,
            loanNumber,
            loanAmount,
            pendingAmount,
            renewableDate,
            mobileNumber
        };
    
        axios.put(`http://localhost:8080/updateLongTermLoan/${editId}`, editedCard)
            .then(response => {
                fetchLoans();
                setEditId(null); // Exit edit mode
                // Clear form fields
                clearForm();
                setError(null);
            })
            .catch(error => {
                console.error('Error updating loan:', error);
                setError('Error updating loan. Please try again.');
            });
    };
    
    const clearForm = () => {
        setBankName('');
        setLoanName('');
        setLoanNumber('');
        setLoanAmount('');
        setPendingAmount('');
        setRenewableDate('');
    };

    const cancelEdit = () => {
        setEditId(null); // Exit edit mode
        // Clear form fields
        clearForm();
    };

    const deleteLoan = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/deleteLongTermLoan/${id}`);
            fetchLoans();
        } catch (error) {
            console.error('Error deleting loan:', error);
        }
    };

    const sendEmailNotification = (card) => {
        const templateParams = {
            to_name: "Dummy name for testing",
            to_email: "pranavarulprakash@gmail.com",
            message: `Your ${card.loanName} loan from ${card.bankName} is due for renewal on ${card.renewableDate}.`
        };
        
        emailjs.send("service_2sg82vx", "template_efj54fh", templateParams, "r7-vFKI6iM_8Dyl01")
            .then((response) => {
                console.log('Email sent successfully:', response);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    useEffect(() => {
        // Check renewable dates periodically and send email notifications if approaching
        const interval = setInterval(() => {
            const today = new Date();
            cards.forEach(card => {
                const renewableDate = new Date(card.renewableDate);
                const oneWeekAhead = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
                if (renewableDate < oneWeekAhead) {
                    sendEmailNotification(card);
                }
            });
        }, 2 * 60  * 60 * 1000); // Check daily

        return () => clearInterval(interval);
    }, [cards]);

    return (
        <div className="monthly-container">
            <h1 className="monthly-header">Long Term Loans</h1>
            <div className="form-container">
                <input className="input-field" type="text" placeholder="Bank Name" value={bankName} onChange={e => setBankName(e.target.value)} />
                <input className="input-field" type="text" placeholder="Loan Name" value={loanName} onChange={e => setLoanName(e.target.value)} />
                <input className="input-field" type="text" placeholder="Loan Number (optional)" value={loanNumber} onChange={e => setLoanNumber(e.target.value)} />
                <input className="input-field" type="text" placeholder="Loan Amount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
                <input className="input-field" type="text" placeholder="Pending Amount" value={pendingAmount} onChange={e => setPendingAmount(e.target.value)} />
                <input className="input-field" type="date" placeholder="Renewable Date" value={renewableDate}  onChange={e => setRenewableDate(e.target.value)} 
                    onFocus={e => e.target.setAttribute('type', 'date')} 
                    onBlur={e => e.target.setAttribute('type', 'text')} 
                />
                {editId ? (
                    <>
                        <button className="add-button" onClick={saveEditedLoan}>Save</button>
                        <button className="cancel-button" onClick={cancelEdit}>Cancel</button>
                    </>
                ) : (
                    <button className="add-button" onClick={addCard}>Add Loan</button>
                )}
                {error && <p className="error-message">{error}</p>}
            </div>

            {/* Render existing cards */}
            <div className="card-container1">
                {cards.map((card, index) => (
                    <div key={index} className="cardMonthly">
                        <p>Bank Name: {card.bankName}</p>
                        <p>Loan Name: {card.loanName}</p>
                        {card.loanNumber && <p>Loan Number: {card.loanNumber}</p>}
                        <p>Loan Amount: {card.loanAmount}</p>
                        <p>Pending Amount: {card.pendingAmount}</p>
                        <p>Renewable Date: {
                            (() => {
                                const date = new Date(card.renewableDate);
                                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                                return formattedDate;
                            })()
                        }</p>                        
                        <div className="card-actions">
                            <button onClick={() => editLoan(card.id)}>Edit</button>
                            <button onClick={() => deleteLoan(card.id)}>Close Loan</button>
                            <DeleteIcon onClick={() => deleteLoan(card.id)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LongTerm;
