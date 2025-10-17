import { useState } from "react";
import styles from "./SearchToggle.module.css";

const SearchToggle = () => {
	const [expanded, setExpanded] = useState(false);

	const toggleSearch = () => {
		setExpanded(!expanded);
	};

	return (
		<div
			className={`${expanded ? styles.expanded : styles.unexpanded} ${styles.searchWrapper}`}
		>
			<input
				type="text"
				placeholder="Пошук товарів..."
				className={styles.searchInput}
			/>
			<button
				type="button"
				className={styles.toggleButton}
				onClick={toggleSearch}
				aria-label="Пошук"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					viewBox="0 0 24 24"
				>
					<circle
						cx="10"
						cy="10"
						r="7"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
					/>
					<line
						x1="15"
						y1="15"
						x2="21"
						y2="21"
						stroke="currentColor"
						strokeWidth="2"
					/>
				</svg>
			</button>
		</div>
	);
};

export default SearchToggle;
