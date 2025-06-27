import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const handleWishlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const action = isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product.id);
        const promise = toast.promise(action, {
            loading: 'Updating wishlist...',
            success: <b>Wishlist updated!</b>,
            error: <b>Could not update wishlist.</b>
        });
    };

    return (
        <div className="product-card">
            <Link to={`/auctions/${product.id}`} className="product-card-link">
                <div className="product-image-container">
                    <img src={product.imageUrl || "https://via.placeholder.com/300x250"} alt={product.title} />
                    <button 
                        onClick={handleWishlistClick} 
                        className={`wishlist-btn-card ${isWishlisted ? 'wishlisted' : ''}`} 
                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <FiHeart />
                    </button>
                </div>
                <div className="product-info">
                    <h3>{product.title}</h3>
                    <p>Start From ${product.startPrice}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
