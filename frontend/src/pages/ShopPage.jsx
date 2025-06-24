import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import './ShopPage.css';

const ShopPage = () => {
    return (
        <div className="shop-page">
            <Sidebar />
            <main className="main-content">
                <div className="shop-header">
                    <select className="sort-dropdown">
                        <option>Default Sorting</option>
                        <option>Sort by Price</option>
                        <option>Sort by Name</option>
                    </select>
                </div>
                <ProductGrid />
                <div className="explore-more-container">
                    <button className="explore-more-btn">EXPLORE MORE</button>
                </div>
            </main>
        </div>
    );
};

export default ShopPage;