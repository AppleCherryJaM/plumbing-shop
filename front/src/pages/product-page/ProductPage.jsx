import "./ProductsPage.css";
import { useParams } from "react-router-dom";
import mockProducts from "../../mock-data/mockData";

const getProduct = (pid, productList) => {
	let result;
	for (const item of productList) {
		if (item.id === pid) result = item;
	}
	return result;
};

const ProductPage = () => {
	const productId = useParams().productId;
	const product = getProduct(productId, mockProducts.data);
	// return <div>{productId}</div>
	const {
		name,
		article,
		brand,
		prices,
		code,
		characteristics = {},
		note,
	} = product;

	return (
		<div className="product-page">
			<div className="product-header">
				<h1 className="product-title">{name}</h1>
				<div className="product-article">Артикул: {article}</div>
				<div className="product-manufacturer">Производитель: {brand.name}</div>
				<div className="product-price">
					{prices.retail} {prices.currency}
				</div>
				<div className="product-code">{code}</div>
			</div>

			<div className="product-characteristics">
				<h2>Характеристики</h2>
				<table className="characteristics-table">
					<tbody>
						{Object.entries(characteristics).map(([key, value]) => (
							<tr key={key}>
								<td className="char-key">{key}:</td>
								<td className="char-value">{value}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{note && (
				<div className="product-note">
					<h3>Зверніть увагу:</h3>
					<p>{note}</p>
				</div>
			)}
		</div>
	);
};

export default ProductPage;
