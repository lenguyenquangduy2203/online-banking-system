import React, { useState } from 'react';
import axios from 'axios';
import './AccountCreation.css';

const AccountCreationComponent = ({ userId }) => {
    const [pin, setPin] = useState('');
    const [accountType, setAccountType] = useState('TRANSACTION'); // Default to TRANSACTION
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePinChange = (event) => {
        setPin(event.target.value);
    };

    const handleAccountTypeChange = (event) => {
        setAccountType(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password || !pin) {
            setError('Please fill out all fields');
            return;
        }

        try {
            const response = await axios.post(`/api/users/${userId}/accounts`, {
                userId: userId,
                type: accountType,
                pin: pin,
                email: email,
                password: password,
            });
            

            setSuccess(`Account created successfully with ID: ${response.data.id}`);
            setError('');
        } catch (err) {
            setError('Failed to create account. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Account Type</label>
                    <select value={accountType} onChange={handleAccountTypeChange}>
                        <option value="TRANSACTION">Transaction</option>
                        <option value="SAVINGS">Savings</option>
                        <option value="EMERGENCY">Checking</option>
                    </select>
                </div>

                <div>
                    <label>PIN</label>
                    <input 
                        type="password" 
                        value={pin} 
                        onChange={handlePinChange} 
                        required 
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        required 
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        required 
                    />
                </div>

                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}

                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default AccountCreationComponent;
