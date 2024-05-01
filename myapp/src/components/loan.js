import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

function Loans() {
    return (
        <div className="loans-container">
            <Link to="/monthly" className="cardLogin">
                <h2>Monthly Repayable Loan</h2>
            </Link>
            <Link to="/longTerm" className="cardLogin">
                <h2>Long Term Renewable Loan</h2>
            </Link>
        </div>
    );
}

export default Loans;
