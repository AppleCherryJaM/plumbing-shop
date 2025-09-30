import { useNavigate } from "react-router-dom";

import { ProductItem } from "../components";
import styles from "./ProductGrid.module.css";

const ProductGrid = ({ products }) => {
	const navigate = useNavigate();
	return (
		<div className={styles.productGrid}>
			{products.map((item) => (
				<ProductItem
					key={item.id}
					title={item.title}
					price={item.price}
					image={item.image}
					onClick={() => navigate(`/product/${item.id}`)}
				/>
			))}
		</div>
	);
};

export default ProductGrid;
