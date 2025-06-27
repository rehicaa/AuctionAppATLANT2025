import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import './TopBar.css';

const TopBar = ({ currentUser, userName }) => {
  return (
    <div className="top-bar">
      <div className="container top-bar-content">
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
        </div>
        <div className="user-section">
          {currentUser ? (
            <span className="welcome-message">Hi, {userName}</span>
          ) : (
            <div className="auth-links-top">
              <Link to="/login">Login</Link>
              <span>/</span>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
