import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig/axiosInstance';
import './AccountCreation.css';

const AccountCreationComponent = ({ language }) => {
  const translations = {
    en: {
      title: "Create Account",
      accountType: "Account Type",
      pin: "PIN",
      email: "Email",
      password: "Password",
      errorFillOutFields: "Please fill out all fields",
      successMessage: "Account created successfully with ID: ",
      errorMessage: "Failed to create account. Please try again.",
      submitButton: "Create Account",
    },
    vn: {
      title: "Tạo Tài Khoản",
      accountType: "Loại Tài Khoản",
      pin: "Mã PIN",
      email: "Email",
      password: "Mật khẩu",
      errorFillOutFields: "Vui lòng điền đầy đủ thông tin",
      successMessage: "Tạo tài khoản thành công với ID: ",
      errorMessage: "Không thể tạo tài khoản. Vui lòng thử lại.",
      submitButton: "Tạo Tài Khoản",
    },
  };

  const text = translations[language] || translations.en;

  const [pin, setPin] = useState('');
  const [accountType, setAccountType] = useState('TRANSACTION'); // Default to TRANSACTION
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const customer = JSON.parse(localStorage.getItem("customer"));

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
      setError(text.errorFillOutFields);
      return;
    }

    try {
      const response = await axiosInstance.post(`/api/users/${customer.id}/accounts`, {
        type: accountType,
        pin: pin,
        email: email,
        password: password,
      });

      setSuccess(`${text.successMessage} ${response.data.data.id}`);
      let accounts = JSON.parse(localStorage.getItem("accounts"));
      accounts = [...accounts, response.data.data];
      localStorage.setItem("accounts", JSON.stringify(accounts));
      setError('');
    } catch (err) {
      setError(text.errorMessage);
      setSuccess('');
    }
  };

  return (
    <div className="account-creation">
      <h3>{text.title}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{text.accountType}</label>
          <select value={accountType} onChange={handleAccountTypeChange}>
            <option value="TRANSACTION">TRANSACTION</option>
            <option value="SAVING">SAVING</option>
            <option value="EMERGENCY">CHECKING</option>
          </select>
        </div>

        <div className="form-group">
          <label>{text.pin}</label>
          <input
            type="password"
            value={pin}
            onChange={handlePinChange}
            required
          />
        </div>

        <div className="form-group">
          <label>{text.email}</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className="form-group">
          <label>{text.password}</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" className="submit-button">{text.submitButton}</button>
      </form>
    </div>
  );
};

export default AccountCreationComponent;
