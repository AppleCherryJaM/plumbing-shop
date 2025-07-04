import React from 'react'
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Logo</div>

      <nav className={styles.nav}>
        <a href="/" className={styles.navLink}>Home</a>
        <a href="/catalog" className={styles.navLink}>Catalog</a>
        <a href="/cart" className={styles.navLink}>Cart</a>
        <a href="/orders" className={styles.navLink}>Orders</a>
      </nav>

      <div className={styles.rightBlock}>
        {/* Место под кнопку входа, профиль или поиск */}
        <button className={styles.loginButton}>Login</button>
      </div>
    </header>
  );
};

export default Header;
