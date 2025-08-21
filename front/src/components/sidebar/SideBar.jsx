import React from 'react'
import styles from './SideBar.module.css';

const Sidebar = ({ children }) => {
	return (
		<aside 
		// className={styles.sidebar}
		>{children}</aside>
	)
}

export default Sidebar;
