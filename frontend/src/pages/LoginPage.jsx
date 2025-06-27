import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { GoogleLogin } from '@react-oauth/google';
import '../styles/Form.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    authService.login(email, password).then(
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
    setMessage('Google Login was unsuccessful. Please try again.');
  };

  return (
    <div className="form-page-container">
      <div className="form-container">
        <h2>LOGIN</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? 'LOGGING IN...' : 'LOGIN'}
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

export default LoginPage;
