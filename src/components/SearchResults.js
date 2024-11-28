import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import "../style/SearchResults.css";

const SearchResults = () => {
    const location = useLocation();
    const { results } = location.state || { results: [] };

    return (
        <div className="search-results">
            <h1 className="results-title">Результаты поиска</h1>
            {results.length > 0 ? (
                <div className="products-grid">
                    {results.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            stock={product.stock}
                            type={product.type}
                            brand={product.brand}
                            model={product.model}
                            category={product.category}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                        />
                    ))}
                </div>
            ) : (
                <p className="no-results">По вашему запросу ничего не найдено.</p>
            )}
        </div>
    );
};

export default SearchResults;
