import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { GoogleLogin } from '@react-oauth/google';
import './RegisterPage.css';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage('');
    setLoading(true);

    authService.register(firstName, lastName, email, password).then(
      (response) => {
        navigate('/login');
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    setLoading(true);
    setMessage('');
    authService.loginWithGoogle(token).then(
      () => {
        navigate('/shop');
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  const handleGoogleError = () => {
    setMessage('Google registration was unsuccessful. Please try again.');
  };

  return (
    <div className="register-page-container">
      <div className="register-form-container">
        <h2>REGISTER</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              required
            />
          </div>
          <div className="form-group">
            <label>Enter Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@domain.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="register-btn" disabled={loading}>
              {loading && <span>Loading...</span>}
              REGISTER
            </button>
          </div>
        </form>
        <div className="social-signup">
           <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
           />
        </div>
        {message && (
            <div className="form-group" style={{marginTop: '20px'}}>
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default RegisterPage;
