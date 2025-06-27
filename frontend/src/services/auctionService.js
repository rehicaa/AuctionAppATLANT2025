import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/auctions';

const getAuctions = (page = 0, size = 8, sortBy = 'startTime', sortOrder = 'desc', minPrice = null, maxPrice = null, categoryIds = [], searchTerm = '') => {
    const params = new URLSearchParams({
        page,
        size,
        sortBy,
        sortOrder
    });

    if (minPrice !== null) {
        params.append('minPrice', minPrice);
    }
    if (maxPrice !== null && maxPrice > 0) {
        params.append('maxPrice', maxPrice);
    }
    if (categoryIds.length > 0) {
        categoryIds.forEach(id => params.append('categoryIds', id));
    }
    if (searchTerm) {
        params.append('searchTerm', searchTerm);
    }

    return axios.get(API_URL, { params });
};

const getAuctionById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createAuction = (auctionData) => {
    return axios.post(API_URL, auctionData, { headers: authHeader() });
};

const auctionService = {
    getAuctions,
    getAuctionById,
    createAuction,
};

export default auctionService;
