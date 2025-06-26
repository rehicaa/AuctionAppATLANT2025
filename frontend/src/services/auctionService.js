import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auctions';

const getAuctions = (page = 0, size = 8, sortBy = 'startTime', sortOrder = 'desc') => {
    return axios.get(API_URL, {
        params: {
            page,
            size,
            sortBy,
            sortOrder
        }
    });
};

const getAuctionById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const auctionService = {
    getAuctions,
    getAuctionById,
};

export default auctionService;
