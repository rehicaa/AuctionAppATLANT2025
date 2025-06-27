import React, { createContext, useState, useEffect, useContext } from 'react';
import wishlistService from '../services/wishlistService';
import authService from '../services/authService';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(new Set());
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await wishlistService.getWishlist();
                const itemIds = response.data.map(item => item.id);
                setWishlist(new Set(itemIds));
            } catch (err) {
              
                console.error("Could not fetch wishlist", err);
                setWishlist(new Set()); 
            }
        };

        if (currentUser) {
            fetchWishlist();
        } else {
           
            setWishlist(new Set());
        }
    }, [currentUser]); 

    const addToWishlist = async (auctionId) => {
        await wishlistService.addToWishlist(auctionId);
        setWishlist(prev => new Set(prev).add(auctionId));
    };

    const removeFromWishlist = async (auctionId) => {
        await wishlistService.removeFromWishlist(auctionId);
        setWishlist(prev => {
            const newWishlist = new Set(prev);
            newWishlist.delete(auctionId);
            return newWishlist;
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
