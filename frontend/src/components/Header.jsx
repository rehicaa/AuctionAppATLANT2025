import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">AUCTION</div>
      <nav className="main-nav">
        <a href="/shop">HOME</a>
        <a href="/shop">SHOP</a>
        <a href="/my-account">MY ACCOUNT</a>
      </nav>
      <div className="auth-links">
        <a href="/login">Login</a> or <a href="/register">Create an Account</a>
      </div>
    </header>
  );
};

export default Header;