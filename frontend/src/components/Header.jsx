import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Header.css';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(undefined);
    setShowDropdown(false);
    navigate('/login');
    window.location.reload();
  };

  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="logo">
          <Link to="/">AUCTION</Link> {/* Promijeni link logotipa */}
        </div>
        <nav className="main-nav">
          <Link to="/">HOME</Link> {/* Promijeni ovaj link */}
          <Link to="/shop">SHOP</Link>
          {currentUser && (
            <div 
              className="my-account-link"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <a href="#">MY ACCOUNT</a>
              {showDropdown && (
                <div className="account-dropdown">
                  <Link to="/profile">Profile</Link>
                  <Link to="/sell">Become a Seller</Link>
                  <Link to="/bids">My Bids</Link>
                  <a href="#" onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</a>
                </div>
              )}
            </div>
          )}
        </nav>
        <div className="auth-links">
          {!currentUser && (
            <>
              <Link to="/login">Login</Link> or <Link to="/register">Create an Account</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
