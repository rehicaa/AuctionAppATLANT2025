import React, { useState } from 'react';
import { FiUser, FiTag, FiAward, FiHeart, FiSettings } from 'react-icons/fi';
import ProfileTab from '../components/profile/ProfileTab';
import SellerTab from '../components/profile/SellerTab';
import BidsTab from '../components/profile/BidsTab';
import WishlistTab from '../components/profile/WishlistTab';
import SettingsTab from '../components/profile/SettingsTab';
import './ProfilePage.css';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileTab />;
            case 'seller':
                return <SellerTab />;
            case 'bids':
                return <BidsTab />;
            case 'wishlist':
                return <WishlistTab />;
            case 'settings':
                return <SettingsTab />;
            default:
                return <ProfileTab />;
        }
    };

    return (
        <div className="profile-page">
            <header className="profile-header">
                <nav className="profile-nav">
                    <button onClick={() => setActiveTab('profile')} className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}><FiUser /> Profile</button>
                    <button onClick={() => setActiveTab('seller')} className={`nav-button ${activeTab === 'seller' ? 'active' : ''}`}><FiTag /> Seller</button>
                    <button onClick={() => setActiveTab('bids')} className={`nav-button ${activeTab === 'bids' ? 'active' : ''}`}><FiAward /> Bids</button>
                    <button onClick={() => setActiveTab('wishlist')} className={`nav-button ${activeTab === 'wishlist' ? 'active' : ''}`}><FiHeart /> Wishlist</button>
                    <button onClick={() => setActiveTab('settings')} className={`nav-button ${activeTab === 'settings' ? 'active' : ''}`}><FiSettings /> Settings</button>
                </nav>
            </header>
            
            <div className="profile-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default ProfilePage;
