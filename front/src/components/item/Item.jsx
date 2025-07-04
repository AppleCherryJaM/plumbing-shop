import React from 'react';
import styles from './ProductItem.module.css';

const ProductItem = ({ title, price, image }) => {
  return (
    <div className="product-item">
      <img src={image} alt={title} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{title}</h3>
        <p className={styles.productPrice}>${price}</p>
      </div>
    </div>
  );
};

export default ProductItem;