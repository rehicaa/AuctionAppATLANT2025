import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import wishlistService from '../../services/wishlistService';
import { formatDistanceToNow } from 'date-fns';
import { FiTrash2 } from 'react-icons/fi';

const WishlistTab = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = () => {
        setLoading(true);
        wishlistService.getWishlist()
            .then(response => {
                setWishlistItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching wishlist", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchWishlist();
    }, []);
    
    const handleRemove = (item) => {
        const promise = wishlistService.removeFromWishlist(item.id).then(() => {
            setWishlistItems(prev => prev.filter(i => i.id !== item.id));
        });

        toast.promise(promise, {
            loading: 'Removing...',
            success: <b>{item.title} removed from wishlist.</b>,
            error: <b>Could not remove item.</b>
        });
    };

    const getTimeLeft = (endTime) => {
        const endDate = new Date(endTime);
        const now = new Date();
        if (endDate < now) return '0s';
        return formatDistanceToNow(endDate, { addSuffix: false });
    };

    if (loading) return <p>Loading wishlist...</p>;

    if (wishlistItems.length === 0) return <p>Your wishlist is empty.</p>;

    return (
        <div className="wishlist-container">
            <table className="wishlist-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Name</th>
                        <th>Time left</th>
                        <th>Highest Bid</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {wishlistItems.map(item => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.imageUrl || 'https://via.placeholder.com/80'} alt={item.title} className="item-image" />
                            </td>
                            <td>
                                <span className="item-title">{item.title}</span>
                                <span className="item-id">#{item.id}</span>
                            </td>
                            <td>{getTimeLeft(item.endTime)}</td>
                            <td className="item-price">${item.startPrice}</td>
                            <td>
                                <span className={`status ${new Date(item.endTime) < new Date() ? 'closed' : 'open'}`}>
                                    {new Date(item.endTime) < new Date() ? 'CLOSED' : 'OPEN'}
                                </span>
                            </td>
                            <td className="action-buttons-cell">
                                <div className="action-buttons">
                                    <Link to={`/auctions/${item.id}`} className="bid-button-table">BID</Link>
                                    <button onClick={() => handleRemove(item)} className="remove-button-table">
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WishlistTab;
