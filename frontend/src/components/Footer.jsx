import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container footer-content">
        <div className="footer-column">
          <h4>AUCTION</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/terms">Terms and Conditions</Link></li>
            <li><Link to="/privacy">Privacy and Policy</Link></li>
          </ul>
        </div>
        <div className="footer-column footer-column-right">
          <h4>GET IN TOUCH</h4>
          <p>Call Us at: <strong>+123 797-567-2535</strong></p>
          <p><strong>support@auction.com</strong></p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
