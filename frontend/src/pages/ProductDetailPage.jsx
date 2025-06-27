import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import auctionService from '../services/auctionService';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [auction, setAuction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        auctionService.getAuctionById(id)
            .then(response => {
                setAuction(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching auction details.');
                setLoading(false);
            });
    }, [id]);

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
                    <h1>{auction.title}</h1>
                    <p className="product-price">Starts from: ${auction.startPrice}</p>
                    <div className="product-description">
                        <h2>Description</h2>
                        <p>{auction.description || 'No description available.'}</p>
                    </div>
                    <div className="auction-end-time">
                        <p>Auction ends on: {new Date(auction.endTime).toLocaleString()}</p>
                    </div>
                    <div className="bid-section">
                        <input type="number" placeholder="Your bid" className="bid-input" />
                        <button className="bid-button">Place Bid</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
