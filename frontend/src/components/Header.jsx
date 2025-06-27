import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/authService';
import TopBar from './TopBar';
import './Header.css';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user && user.token) {
      setCurrentUser(user);
      try {
        const decodedToken = jwtDecode(user.token);
        if (decodedToken.firstName) {
          setUserName(decodedToken.firstName);
        } else {
          setUserName(decodedToken.sub.split('@')[0]);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        authService.logout();
      }
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(undefined);
    setUserName('');
    setIsMenuOpen(false);
    setShowDropdown(false);
    navigate('/login');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <TopBar currentUser={currentUser} userName={userName} />
      <header className="app-header">
        <div className="container header-content">
          <div className="header-left">
            <div className="logo">
              <Link to="/" onClick={closeMenu}>AUCTION</Link>
            </div>
          </div>

          <nav className="main-nav-desktop">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/shop">SHOP</NavLink>
            {currentUser && (
              <div
                className="my-account-link"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <a>MY ACCOUNT</a>
                {showDropdown && (
                  <div className="account-dropdown">
                    <Link to="/profile" onClick={() => setShowDropdown(false)}>Profile</Link>
                    <Link to="/sell" onClick={() => setShowDropdown(false)}>Become a Seller</Link>
                    <Link to="/bids" onClick={() => setShowDropdown(false)}>My Bids</Link>
                    <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
                  </div>
                )}
              </div>
            )}
          </nav>

          <div className="header-right">
          </div>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <nav className="mobile-menu">
            <NavLink to="/" onClick={closeMenu}>HOME</NavLink>
            <NavLink to="/shop" onClick={closeMenu}>SHOP</NavLink>
            {currentUser ? (
                <>
                    <NavLink to="/profile" onClick={closeMenu}>MY PROFILE</NavLink>
                    <NavLink to="/sell" onClick={closeMenu}>BECOME A SELLER</NavLink>
                    <NavLink to="/bids" onClick={closeMenu}>MY BIDS</NavLink>
                    <a onClick={handleLogout} style={{ cursor: 'pointer' }}>LOGOUT</a>
                </>
            ) : (
                <>
                    <NavLink to="/login" onClick={closeMenu}>LOGIN</NavLink>
                    <NavLink to="/register" onClick={closeMenu}>REGISTER</NavLink>
                </>
            )}
        </nav>
      )}
    </>
  );
};

export default Header;
