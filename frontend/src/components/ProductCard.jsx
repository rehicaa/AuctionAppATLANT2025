import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/auctions/${product.id}`} className="product-card-link">
            <div className="product-card">
                <div className="product-image-container">
                    <img src={product.imageUrl || "https://via.placeholder.com/300x250"} alt={product.title} />
                </div>
                <div className="product-info">
                    <h3>{product.title}</h3>
                    <p>Start From ${product.startPrice}</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
