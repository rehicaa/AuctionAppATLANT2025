import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-section">
                <h4>PRODUCT CATEGORIES</h4>
                <ul>
                    <li>Women <span>(120)</span></li>
                    <li>Men <span>(+)</span></li>
                    <li>Kids <span>(+)</span></li>
                    <li>Accessorize <span>(+)</span></li>
                    <li>Home <span>(+)</span></li>
                    <li>Art <span>(+)</span></li>
                    <li>Computers <span>(+)</span></li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;