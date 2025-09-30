import styles from "./Footer.module.css";

const Footer = ({ email, phone }) => {
	return (
		<footer className={styles.footer}>
			Contact: Email: {email} &nbsp; | &nbsp; Tel: {phone}
		</footer>
	);
};

export default Footer;
