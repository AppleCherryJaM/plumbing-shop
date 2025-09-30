import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { BurgerButton, Header, SideBar } from "../components";

import styles from "./Layout.module.css";

const Layout = ({ onAuthBtnClick }) => {
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
						initial={{ x: "-100%" }}
						animate={{ x: 0 }}
						exit={{ x: "-100%" }}
						transition={{ type: "spring", stiffness: 260, damping: 25 }}
						className={styles.sidebar}
					>
						<div className={styles.sidebarHeader}>
							<BurgerButton isOpen={menuOpen} onClick={toggleMenu} />
						</div>

						<SideBar />
					</motion.div>
				)}
			</AnimatePresence>

			<main style={{ padding: "20px" }}>
        <Outlet />
      </main>
		</>
	);
};

export default Layout;
