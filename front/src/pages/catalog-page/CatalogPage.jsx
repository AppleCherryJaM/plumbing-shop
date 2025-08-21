import React from 'react'
import { ProductGrid } from '../../components/components'
import styles from "./CatalogPage.module.css";

const sampleProducts = [
  { id: 1, title: 'Modern Faucet', price: 95, image: '/images/faucet.png' },
  { id: 2, title: 'Shower Head XL', price: 85, image: '/images/shower.png' },
  { id: 3, title: 'Toilet Seat Comfort', price: 120, image: '/images/toilet.png' },
  { id: 4, title: 'Pipe Set 3m', price: 45, image: '/images/pipes.png' },
  { id: 5, title: 'Sink Drain Kit', price: 35, image: '/images/sink.png' },
  { id: 6, title: 'Wall Mount Tap', price: 60, image: '/images/tap.png' },
];

function CatalogPage() {
	return (
    <div className={styles.catalogWrapper}>
      <main className={styles.catalogMain}>
        <h2 className={styles.catalogTitle}>Product Catalog</h2>
        <ProductGrid products={sampleProducts} />
      </main>
    </div>
  );
}

export default CatalogPage