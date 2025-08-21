import React from 'react';
import styles from './BurgerButton.module.css';

const BurgerButton = ({ isOpen, onClick }) => {
	const handler = () => {
		console.log('Clicked');
		onClick();
	}
  return (
		<div className={styles.burgerWrapper} onClick={handler}>
			<button
      	className={`${styles.burger} ${isOpen ? styles.active : ''}`}
      	aria-label="Меню"
    	>
      	<span></span>
      	<span></span>
      	<span></span>
    	</button>
		</div>
  );
};

export default BurgerButton;
