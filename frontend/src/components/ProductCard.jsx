import React from 'react';
import './ProductCard.css';

const ProductCard = ({ title, price, imageUrl }) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={imageUrl || "https://via.placeholder.com/300x250"} alt={title} />
            </div>
            <div className="product-info">
                <h3>{title}</h3>
                <p>Start From ${price}</p>
            </div>
        </div>
    );
};

export default ProductCard;