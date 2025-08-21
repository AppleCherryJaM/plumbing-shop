import React from 'react';
import { ProductItem } from '../components';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products }) => {
  return (
    <div className={styles.productGrid}>
      {products.map((item) => (
        <ProductItem
          key={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default ProductGrid;

