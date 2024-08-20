import React, { useState } from 'react';
import './RegisterModal.css';
import { IoIosClose } from "react-icons/io";
import axios from 'axios';

const RegisterModal = ({ isRegisterOpen, onRegisterClose, onSuccessfulRegister }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'userName') {
      setUserName(value);
    }
    if (id === 'email') {
      setEmail(value);
    }
    if (id === 'phoneNumber') {
      setPhoneNumber(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
    if (id === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !email || !phoneNumber || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!/^\d+$/.test(phoneNumber)) {
      setError("Phone number should contain only numbers.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Prepare data to send to the backend
    const userData = {
      username: userName,
      email: email,
      phonenumber: phoneNumber,
      password: password
    };

    try {
      // POST request to the backend API
      const response = await axios.post('http://localhost:8080/api/registerUser', userData);

      if (response.status === 200) {
        console.log("Successfully Registered");
        // Close the registration modal
        onRegisterClose();
        // Open the login modal
        onSuccessfulRegister();
        // Clear form after successful registration
        setUserName("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        setConfirmPassword("");
        setError(""); // Clear error message if any
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      // Check if the error is due to a taken username
      if (error.response && error.response.status === 400 && error.response.data === "Username already taken") {
        setError("Username already taken. Please choose a different one.");
      } else {
        console.error("There was an error registering the user:", error);
        setError("Registration failed. Please try again.");
      }
    
  };
}

  if (!isRegisterOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onRegisterClose}><IoIosClose /></span>
        <form className="loginform" onSubmit={handleSubmit}>
          <p style={{ fontSize: '20px', fontWeight: 'bold' ,color:'black' }}>Register</p>
          <br />
          <input
            placeholder="Username"
            value={userName}
            id="userName"
            onChange={handleInputChange}
            type="text"
            className="login-input"
          />
          <div></div>
          <br />
          <input
            placeholder="Email"
            type="email"
            value={email}
            id="email"
            onChange={handleInputChange}
            className="login-input"
          />
          <div></div>
          <br />
          <input
            placeholder="Phone Number"
            type="text"
            value={phoneNumber}
            id="phoneNumber"
            onChange={handleInputChange}
            className="login-input"
          />
          <div></div>
          <br />
          <input
            placeholder="Password"
            type="password"
            value={password}
            id="password"
            onChange={handleInputChange}
            className="login-input"
          />
          <div></div>
          <br />
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            id="confirmPassword"
            onChange={handleInputChange}
            className="login-input"
          />
          <div></div>
          <br /><br />
          <button className="login-button" type="submit">
            Register
          </button>
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
