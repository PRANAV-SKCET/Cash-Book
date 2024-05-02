import './App.css';
import CashBook from './components/cashbook';
import Login from './components/login';
import Navbar from './components/navbar';
import SignUp from './components/signup';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthContext } from './components/context'
import Loans from './components/loan';
import Contact from './components/contact';
import Report from './components/report';
import Profile from './components/profile';
import Transaction from './components/transaction';
import './App.css';
import Monthly from './components/monthly';
import LongTerm from './components/longTerm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileNumber,setMobileNumber] = useState('');
  const [cardNameAuth,setCardNameAuth] = useState('');
  const [userName,setUserName] = useState('');
  const [userEmail,setUserEmail] = useState('');


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        mobileNumber,
        setMobileNumber,
        cardNameAuth,
        setCardNameAuth
      }}
    >
      <Router>
        {isLoggedIn && <Navbar />}
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cashbook" element={<CashBook />} />
          <Route path="/navbar" element={<Navbar/>} /> 
          <Route path="/loan" element={<Loans/>} /> 
          <Route path="/contact" element={<Contact/>} /> 
          <Route path="/report" element={<Report/>} /> 
          <Route path="/profile" element={<Profile/>} /> 
          <Route path="/transaction" element={<Transaction/>} /> 
          <Route path="/monthly" element={<Monthly/>} /> 
          <Route path="/longTerm" element={<LongTerm/>} /> 
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
