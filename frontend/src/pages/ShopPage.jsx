import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import auctionService from '../services/auctionService.js';
import './ShopPage.css';

const ShopPage = () => {
    const [auctions, setAuctions] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [sort, setSort] = useState('startTime,desc');
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [loading, setLoading] = useState(false);

    const fetchAuctions = useCallback((currentPage, currentSort, currentPriceRange, isLoadMore = false) => {
        setLoading(true);
        const [sortBy, sortOrder] = currentSort.split(',');
        const [minPrice, maxPrice] = currentPriceRange;

        auctionService.getAuctions(currentPage, 8, sortBy, sortOrder, minPrice, maxPrice)
            .then(response => {
                const data = response.data;
                if (isLoadMore) {
                    setAuctions(prev => [...prev, ...data.content]);
                } else {
                    setAuctions(data.content);
                }
                setHasMore(!data.last);
            })
            .catch(error => {
                console.error("Error fetching auctions:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setPage(0);
        fetchAuctions(0, sort, priceRange, false);
    }, [sort, priceRange, fetchAuctions]);

    const handleExploreMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchAuctions(nextPage, sort, priceRange, true);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handlePriceChange = (newPriceRange) => {
        setPriceRange(newPriceRange);
    };

    const handleCollapse = () => {
        setPage(0);
        setAuctions(prev => prev.slice(0, 8)); // Prikazi samo prvih 8
        setHasMore(true); // Omoguci ponovo "Explore More"
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Skroluj na vrh stranice
    };
    
    return (
        <div className="shop-page">
            <Sidebar onPriceChange={handlePriceChange} />
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
                {loading && page === 0 ? <p>Loading...</p> : <ProductGrid products={auctions} />}
                
                <div className="pagination-controls">
                    {hasMore && !loading && (
                        <button className="explore-more-btn" onClick={handleExploreMore}>
                            EXPLORE MORE
                        </button>
                    )}
                    {page > 0 && !loading && (
                        <button className="collapse-btn" onClick={handleCollapse}>
                            SHOW LESS
                        </button>
                    )}
                </div>

                {loading && page > 0 && <p style={{textAlign: 'center', marginTop: '20px'}}>Loading more...</p>}
            </div>
        </div>
    );
};

export default ShopPage;
