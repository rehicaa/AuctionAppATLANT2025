import React from 'react';
import ProductCard from './ProductCard.jsx';
import './ProductGrid.css';

const ProductGrid = () => {
    const dummyProducts = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: "Shoes Collection",
        price: "59.00",
        imageUrl: "https://via.placeholder.com/300x250"
    }));

    return (
        <div className="product-grid">
            {dummyProducts.map(product => (
                <ProductCard
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    imageUrl={product.imageUrl}
                />
            ))}
        </div>
    );
};

export default ProductGrid;