import logo from "/images/vas-blue-logo.png";
import { BurgerButton, RegistrationToggle, SearchToggle } from "../components";
import styles from "./Header.module.css";

const Header = ({ onAuthButtonClick, menuOpen, toggleMenu }) => {
	return (
		<header className={styles.siteHeader}>
			<div className={styles.container}>
				<div className={styles.leftBlock}>
					<BurgerButton isOpen={menuOpen} onClick={toggleMenu} />
					<a href="/" className={styles.logo}>
						<img src={logo} alt="Логотип" />
					</a>
				</div>
				<div className={styles.rightBlock}>
					<SearchToggle />
					<RegistrationToggle onAuthButtonClick={onAuthButtonClick} />
				</div>
			</div>
		</header>
	);
};

export default Header;
