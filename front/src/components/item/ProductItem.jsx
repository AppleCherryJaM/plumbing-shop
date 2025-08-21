import React from 'react';
import './ProductItem.css';

const ProductItem = ({ 
  product,
  variant = 'default', // 'default' | 'compact'
  onAddToCart 
}) => {
  const {
    id,
    name,
    images = [],
    prices,
    stock,
    metadata = {}
  } = product;

  return (
    <div className={`product-card ${variant}`}>
      <div className="product-image">
        {images[0] ? (
          <img 
            src={images[0]} 
            alt={name}
            onError={(e) => {
              e.target.src = '/images/product-placeholder.jpg';
            }}
          />
        ) : (
          <div className="image-placeholder">Нет изображения</div>
        )}
        
        {metadata.isTopSales && (
          <div className="product-badge top-sales">Топ продаж</div>
        )}
      </div>

      <div className="product-content">
        <h3 className="product-title">{name}</h3>
        
        <div className="product-pricing">
          <span className="price">{prices.retail} {prices.currency}</span>
          {prices.discount && (
            <span className="discount-price">{prices.discount} {prices.currency}</span>
          )}
        </div>

        <div className="product-stock">
          В наличии: <strong>{stock.available} шт.</strong>
        </div>

        {variant === 'default' && (
          <button 
            className="add-to-cart-btn"
            onClick={() => onAddToCart?.(product)}
          >
            В корзину
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;