import styles from "./BurgerButton.module.css";

const BurgerButton = ({ isOpen, onClick }) => {
	const handler = () => {
		onClick();
	};
	return (
		<div className={styles.burgerWrapper} onClick={handler}>
			<button
				type="button"
				className={`${styles.burger} ${isOpen ? styles.active : ""}`}
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
