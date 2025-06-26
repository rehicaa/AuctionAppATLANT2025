import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Sidebar.css';

const Sidebar = ({ onPriceChange }) => {
    const [price, setPrice] = useState([0, 1000]);

    const handleSliderChange = (newPrice) => {
        setPrice(newPrice);
    };
    
    const handleAfterChange = (value) => {
        onPriceChange(value);
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-section">
                <h4>PRODUCT CATEGORIES</h4>
                <ul>
                    <li>Women</li>
                    <li>Men</li>
                    <li>Kids</li>
                    <li>Electronics</li>
                    <li>Home</li>
                </ul>
            </div>
            <div className="sidebar-section">
                <h4>FILTER BY PRICE</h4>
                <div className="price-slider">
                    <Slider
                        range
                        min={0}
                        max={1000}
                        defaultValue={[0, 1000]}
                        onChange={handleSliderChange}
                        onAfterChange={handleAfterChange}
                        trackStyle={[{ backgroundColor: 'var(--primary-color)' }]}
                        handleStyle={[
                            { borderColor: 'var(--primary-color)' },
                            { borderColor: 'var(--primary-color)' }
                        ]}
                    />
                    <div className="price-display">
                        <span>${price[0]}</span>
                        <span>${price[1]}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
