import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header, SideBar, BurgerButton } from '../components';

import styles from "./Layout.module.css";

const Layout = ({ onAuthBtnClick, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <Header
        onAuthButtonClick={onAuthBtnClick}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className={styles.sidebar}
          >
            <div className={styles.sidebarHeader}>
              <BurgerButton isOpen={menuOpen} onClick={toggleMenu} />
            </div>

            <SideBar />
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ padding: '20px' }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
