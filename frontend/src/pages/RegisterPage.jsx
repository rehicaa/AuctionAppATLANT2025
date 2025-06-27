import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { GoogleLogin } from '@react-oauth/google';
import '../styles/Form.css';

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
      () => {
        navigate('/shop');
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response?.data?.message) ||
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
          (error.response?.data?.message) ||
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
    <div className="form-page-container">
      <div className="form-container">
        <h2>REGISTER</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Enter Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? 'REGISTERING...' : 'REGISTER'}
            </button>
          </div>
        </form>
        <div className="divider">or</div>
        <div className="google-login-container">
           <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="continue_with"
                shape="rectangular"
                theme="outline"
           />
        </div>
        {message && (
            <div className="alert alert-danger" style={{marginTop: '20px'}}>
              {message}
            </div>
          )}
      </div>
    </div>
  );
};

export default RegisterPage;
