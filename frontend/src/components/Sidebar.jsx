import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Sidebar.css';

const Sidebar = ({ onPriceChange, onCategoryChange, allCategories, selectedCategories }) => {
    const [price, setPrice] = useState([0, 1000]);

    const handleSliderChange = (newPrice) => {
        setPrice(newPrice);
    };
    
    const handleAfterChange = (value) => {
        onPriceChange(value);
    };
    
    const handleStyle = [
        { borderColor: 'var(--primary-color)' },
        { borderColor: 'var(--primary-color)' }
    ];
    
    const trackStyle = { backgroundColor: 'var(--primary-color)' };

    return (
        <aside className="sidebar">
            <div className="sidebar-section">
                <h4>PRODUCT CATEGORIES</h4>
                <ul className="category-list">
                    {allCategories.map(category => (
                        <li key={category.id}>
                            <label className="category-label">
                                <input 
                                    type="checkbox" 
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => onCategoryChange(category.id)}
                                />
                                {category.name}
                            </label>
                        </li>
                    ))}
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
                        trackStyle={[trackStyle]}
                        handleStyle={handleStyle}
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
