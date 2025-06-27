import React, { createContext, useState, useEffect, useContext } from 'react';
import wishlistService from '../services/wishlistService';
import authService from '../services/authService';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(new Set());
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        if (currentUser) {
            wishlistService.getWishlist()
                .then(response => {
                    const itemIds = response.data.map(item => item.id);
                    setWishlist(new Set(itemIds));
                })
                .catch(err => console.error("Could not fetch wishlist", err));
        }
    }, [currentUser]);

    const addToWishlist = (auctionId) => {
        return wishlistService.addToWishlist(auctionId).then(() => {
            setWishlist(prev => new Set(prev).add(auctionId));
        });
    };

    const removeFromWishlist = (auctionId) => {
        return wishlistService.removeFromWishlist(auctionId).then(() => {
            setWishlist(prev => {
                const newWishlist = new Set(prev);
                newWishlist.delete(auctionId);
                return newWishlist;
            });
        });
    };

    const isInWishlist = (auctionId) => {
        return wishlist.has(auctionId);
    };

    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
