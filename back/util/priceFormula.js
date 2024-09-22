module.exports = (price, discountPercent) => {
	return price - (price * discountPercent/100);
}