import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import auctionService from '../services/auctionService';
import authService from '../services/authService';
import wishlistService from '../services/wishlistService';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [auction, setAuction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);

    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        if (currentUser && currentUser.token) {
            try {
                const decoded = jwtDecode(currentUser.token);
                setCurrentUserId(decoded.userId);
            } catch (err) {
                console.error("Invalid token");
            }
        }

        auctionService.getAuctionById(id)
            .then(response => {
                setAuction(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching auction details.');
                setLoading(false);
            });
    }, [id, currentUser]);

    const handleAddToWishlist = () => {
        if (!auction) return;
        
        const promise = wishlistService.addToWishlist(auction.id);
        
        toast.promise(promise, {
            loading: 'Adding...',
            success: <b>{auction.title} added to wishlist!</b>,
            error: <b>Could not add to wishlist.</b>
        });
    };

    const renderBidSection = () => {
        if (!currentUser) {
            return (
                <div className="login-prompt">
                    <p>Please <Link to="/login">log in</Link> to place a bid.</p>
                </div>
            );
        }

        if (currentUserId === auction.sellerId) {
            return (
                <div className="owner-prompt">
                    <p>This is your auction. You cannot place a bid.</p>
                </div>
            );
        }

        return (
            <div className="bid-section">
                <input type="number" placeholder="Your bid" className="bid-input" />
                <button className="bid-button">Place Bid</button>
            </div>
        );
    };

    if (loading) {
        return <div className="container">Loading...</div>;
    }

    if (error) {
        return <div className="container"><div className="error-message">{error}</div></div>;
    }

    if (!auction) {
        return <div className="container">Auction not found.</div>;
    }

    return (
        <div className="container">
            <div className="product-detail-container">
                <div className="product-detail-image-section">
                    <img src={auction.imageUrl || 'https://via.placeholder.com/600x500'} alt={auction.title} />
                </div>
                <div className="product-detail-info-section">
                    <span className="category-tag">{auction.categoryName}</span>
                    <h1>{auction.title}</h1>
                    <div className="price-wishlist-wrapper">
                        <p className="product-price">Starts from: ${auction.startPrice}</p>
                        {currentUser && (
                            <button className="wishlist-btn-page" onClick={handleAddToWishlist}>
                                <FiHeart /> Add to Wishlist
                            </button>
                        )}
                    </div>
                    <div className="product-description">
                        <h2>Description</h2>
                        <p>{auction.description || 'No description available.'}</p>
                    </div>
                    <div className="auction-end-time">
                        <p>Auction ends on: {new Date(auction.endTime).toLocaleString()}</p>
                    </div>
                    {renderBidSection()}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
