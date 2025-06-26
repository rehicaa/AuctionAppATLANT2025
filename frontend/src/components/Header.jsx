import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const currentUser = null; // Ovde ćeš kasnije dodati logiku za prijavljenog korisnika

  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="logo">
          <Link to="/shop">AUCTION</Link>
        </div>
        <nav className="main-nav">
          <Link to="/shop">HOME</Link>
          <Link to="/shop">SHOP</Link>
          {currentUser && <Link to="/my-account">MY ACCOUNT</Link>}
        </nav>
        <div className="auth-links">
          {currentUser ? (
            <span>Welcome!</span> // Zameni sa logout dugmetom
          ) : (
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
