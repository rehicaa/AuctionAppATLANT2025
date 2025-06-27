import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import auctionService from '../services/auctionService.js';
import './ShopPage.css';

const ShopPage = () => {
    const [auctions, setAuctions] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [sort, setSort] = useState('startTime,desc');

    const fetchAuctions = (currentPage, currentSort) => {
        const [sortBy, sortOrder] = currentSort.split(',');
        auctionService.getAuctions(currentPage, 8, sortBy, sortOrder)
            .then(response => {
                const data = response.data;
                setAuctions(prev => currentPage === 0 ? data.content : [...prev, ...data.content]);
                setHasMore(!data.last);
            })
            .catch(error => {
                console.error("Error fetching auctions:", error);
            });
    };

    useEffect(() => {
        fetchAuctions(0, sort);
    }, [sort]);

    const handleExploreMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchAuctions(nextPage, sort);
    };

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSort(newSort);
        setPage(0);
        setAuctions([]);
    };
    
    return (
        <div className="shop-page">
            <Sidebar />
            <div className="shop-main-content">
                <div className="shop-header">
                    <select className="sort-dropdown" value={sort} onChange={handleSortChange}>
                        <option value="startTime,desc">Sort by Newness</option>
                        <option value="startPrice,asc">Sort by Price: Low to High</option>
                        <option value="startPrice,desc">Sort by Price: High to Low</option>
                        <option value="title,asc">Sort by Name: A-Z</option>
                        <option value="title,desc">Sort by Name: Z-A</option>
                    </select>
                </div>
                <ProductGrid products={auctions} />
                {hasMore && (
                    <div className="explore-more-container">
                        <button className="explore-more-btn" onClick={handleExploreMore}>
                            EXPLORE MORE
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
