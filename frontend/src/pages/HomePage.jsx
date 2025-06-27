import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const currentUser = authService.getCurrentUser();

    const handleUploadClick = () => {
        if (currentUser) {
            navigate('/sell');
        } else {
            navigate('/register');
        }
    };

    return (
        <div className="home-page">
            <div className="hero-section">
                <h1 className="hero-title">Dobrodošli na Auction</h1>
                <p className="hero-subtitle">Vaše odredište za jedinstvene predmete i uzbudljive aukcije.</p>
                <div className="hero-actions">
                    <Link to="/shop" className="cta-button primary">Započni Istraživanje</Link>
                    <button onClick={handleUploadClick} className="cta-button secondary">Postavi Predmet</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
