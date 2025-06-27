import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/wishlist';

const getWishlist = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const addToWishlist = (auctionId) => {
    return axios.post(`${API_URL}/${auctionId}`, null, { headers: authHeader() });
};

const removeFromWishlist = (auctionId) => {
    return axios.delete(`${API_URL}/${auctionId}`, { headers: authHeader() });
};

const wishlistService = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
};

export default wishlistService;
