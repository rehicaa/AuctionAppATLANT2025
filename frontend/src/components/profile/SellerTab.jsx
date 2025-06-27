import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

const SellerTab = () => {
    const [activeSubTab, setActiveSubTab] = useState('active');

    return (
        <div>
            <div className="seller-sub-nav">
                <div>
                    <button onClick={() => setActiveSubTab('active')} className={activeSubTab === 'active' ? 'active' : ''}>Active</button>
                    <button onClick={() => setActiveSubTab('sold')} className={activeSubTab === 'sold' ? 'active' : ''}>Sold</button>
                </div>
                <Link to="/sell" className="add-item-btn-seller"><FiPlus /> ADD NEW ITEM</Link>
            </div>
            <div className="seller-content">
                {activeSubTab === 'active' && <p>List of active items...</p>}
                {activeSubTab === 'sold' && <p>List of sold items...</p>}
            </div>
        </div>
    );
};

export default SellerTab;
