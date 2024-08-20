import React, { useState } from 'react';
import './LoginModal.css';
import { IoIosClose } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'userName') {
      setUserName(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setError('All fields are required');
      return;
    }



    try {
      const response = await axios.post("http://localhost:8080/api/loginUser", {
        username: userName,
        password: password
      });

      if (response.status === 200) {

        sessionStorage.setItem("username", userName);
        setError('');
        onClose();
        navigate('/categories')
      }
    }
    catch (error) {
      console.error("Error details:", error);
      if (error.response && error.response.status === 401) {
        setError("Incorrect username or password");
      }
      else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }


  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}><IoIosClose /></span>
        <form className="loginform" onSubmit={handleSubmit}>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Login</p>
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
            placeholder="Password"
            type="password"
            value={password}
            id="password"
            onChange={handleInputChange}
            className="login-input"
          />
          <div></div>
          <br /><br />
          <button className="login-button" type="submit">
            Login
          </button>
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

        </form>
      </div>
    </div>
  );
};

export default LoginModal;
