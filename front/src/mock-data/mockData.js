const mockProducts = {
	success: true,
	data: [
		{
			id: "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
			name: "Смеситель для раковины Aurora Modern",
			prices: {
				retail: 124.99,
				wholesale: 89.99,
				currency: "USD",
				discount: 99.99,
			},
			images: [
				"https://sanit.by/files/resized/original-2640-11384047419-S-50-7201-1.jpg",
				"https://sanit.by/files/resized/original-2640-2104059922-S-50-7201-3.jpg"
			],
			brand: {
				id: 1,
				name: "Aurora",
				logo: "/brands/aurora.png",
			},
			categories: [
				{ id: 1, name: "Смесители" },
				{ id: 5, name: "Новинки 2024" },
			],
			metadata: {
				isTopSales: true,
				isRecommended: true,
				rating: 4.7,
				reviewsCount: 24,
			},
			stock: {
				available: 42,
				inWarehouses: [
					{ id: 1, location: "Москва", quantity: 30 },
					{ id: 2, location: "Санкт-Петербург", quantity: 12 },
				],
			},
		},
		{
			id: "b2c3d4e5-f6g7-8901-h2i3-j4k5l6m7n8o9",
			name: "Унитаз подвесной Vitra Clean",
			prices: {
				retail: 349.5,
				wholesale: 279.99,
				currency: "USD",
				discount: null,
			},
			images: [
				"https://sanit.by/files/resized/original-2640-11384047419-S-50-7201-1.jpg",
				"https://sanit.by/files/resized/original-2640-2104059922-S-50-7201-3.jpg"
			],
			brand: {
				id: 2,
				name: "Vitra",
				logo: "/brands/vitra.png",
			},
			categories: [{ id: 2, name: "Унитазы" }],
			metadata: {
				isTopSales: true,
				isRecommended: false,
				rating: 4.9,
				reviewsCount: 18,
			},
			stock: {
				available: 18,
				inWarehouses: [
					{ id: 1, location: "Москва", quantity: 10 },
					{ id: 3, location: "Новосибирск", quantity: 8 },
				],
			},
		},
		{
			id: "c3d4e5f6-g7h8-9012-i3j4-k5l6m7n8o9p0",
			name: "Раковина из искусственного камня Blanco Subline",
			prices: {
				retail: 412.75,
				wholesale: 349.99,
				currency: "USD",
				discount: 379.99,
			},
			images: [
				"https://sanit.by/files/resized/original-2640-11384047419-S-50-7201-1.jpg",
				"https://sanit.by/files/resized/original-2640-2104059922-S-50-7201-3.jpg"
			],
			brand: {
				id: 3,
				name: "Blanco",
				logo: "/brands/blanco.png",
			},
			categories: [
				{ id: 3, name: "Раковины" },
				{ id: 7, name: "Кухонная сантехника" },
			],
			metadata: {
				isTopSales: false,
				isRecommended: true,
				rating: 4.7,
				reviewsCount: 23,
			},
			stock: {
				available: 12,
				inWarehouses: [
					{ id: 2, location: "Санкт-Петербург", quantity: 7 },
					{ id: 4, location: "Екатеринбург", quantity: 5 },
				],
			},
		},
		{
			id: "d4e5f6g7-h8i9-0123-j4k5-l6m7n8o9p0q1",
			name: "Душевая система Grohe Euphoria",
			prices: {
				retail: 587.0,
				wholesale: 469.99,
				currency: "USD",
				discount: null,
			},
			images: [
				"https://sanit.by/files/resized/original-2640-11384047419-S-50-7201-1.jpg",
				"https://sanit.by/files/resized/original-2640-2104059922-S-50-7201-3.jpg"
			],
			brand: {
				id: 4,
				name: "Grohe",
				logo: "/brands/grohe.png",
			},
			categories: [{ id: 4, name: "Душевые системы" }],
			metadata: {
				isTopSales: true,
				isRecommended: true,
				rating: 4.8,
				reviewsCount: 31,
			},
			stock: {
				available: 8,
				inWarehouses: [
					{ id: 1, location: "Москва", quantity: 5 },
					{ id: 3, location: "Новосибирск", quantity: 3 },
				],
			},
		},
		{
			id: "e5f6g7h8-i9j0-1234-k5l6-m7n8o9p0q1r2",
			name: "Смеситель для ванны Hansgrohe Focus",
			prices: {
				retail: 231.5,
				wholesale: 189.99,
				currency: "USD",
				discount: 209.99,
			},
			images: [
				"https://sanit.by/files/resized/original-2640-11384047419-S-50-7201-1.jpg",
				"https://sanit.by/files/resized/original-2640-2104059922-S-50-7201-3.jpg"
			],
			brand: {
				id: 5,
				name: "Hansgrohe",
				logo: "/brands/hansgrohe.png",
			},
			categories: [
				{ id: 1, name: "Смесители" },
				{ id: 5, name: "Для ванной" },
			],
			metadata: {
				isTopSales: false,
				isRecommended: true,
				rating: 4.6,
				reviewsCount: 17,
			},
			stock: {
				available: 25,
				inWarehouses: [
					{ id: 1, location: "Москва", quantity: 15 },
					{ id: 2, location: "Санкт-Петербург", quantity: 10 },
				],
			},
		},
		{
			id: "f6g7h8i9-j0k1-2345-l6m7-n8o9p0q1r2s3",
			name: "Водоочистительный фильтр BWT Penguin",
			prices: {
				retail: 189.99,
				wholesale: 149.99,
				currency: "USD",
				discount: null,
			},
			images: [
				"https://sanit.by/files/resized/original-2640-11384047419-S-50-7201-1.jpg",
				"https://sanit.by/files/resized/original-2640-2104059922-S-50-7201-3.jpg"
			],
			brand: {
				id: 6,
				name: "BWT",
				logo: "/brands/bwt.png",
			},
			categories: [
				{ id: 6, name: "Фильтры для воды" },
				{ id: 8, name: "Системы очистки" },
			],
			metadata: {
				isTopSales: true,
				isRecommended: false,
				rating: 4.5,
				reviewsCount: 42,
			},
			stock: {
				available: 15,
				inWarehouses: [
					{ id: 4, location: "Екатеринбург", quantity: 8 },
					{ id: 5, location: "Казань", quantity: 7 },
				],
			},
		},
		{
			id: "g7h8i9j0-k1l2-3456-m7n8-o9p0q1r2s3t4",
			name: "Биде Catalano Nuvola",
			prices: {
				retail: 275.25,
				wholesale: 219.99,
				currency: "USD",
				discount: 249.99,
			},
			images: [
				"https://sanit.by/files/resized/original-2640-11384047419-S-50-7201-1.jpg",
				"https://sanit.by/files/resized/original-2640-2104059922-S-50-7201-3.jpg"
			],
			brand: {
				id: 7,
				name: "Catalano",
				logo: "/brands/catalano.png",
			},
			categories: [{ id: 9, name: "Биде" }],
			metadata: {
				isTopSales: false,
				isRecommended: false,
				rating: 4.3,
				reviewsCount: 9,
			},
			stock: {
				available: 6,
				inWarehouses: [
					{ id: 1, location: "Москва", quantity: 4 },
					{ id: 2, location: "Санкт-Петербург", quantity: 2 },
				],
			},
		},
		{
			id: "h8i9j0k1-l2m3-4567-n8o9-p0q1r2s3t4u5",
			name: "Ванная чугунная Roca Cast Iron",
			prices: {
				retail: 899.99,
				wholesale: 749.99,
				currency: "USD",
				discount: 829.99,
			},
			images: [
				"https://sanit.by/files/resized/original-2640-11384047419-S-50-7201-1.jpg",
				"https://sanit.by/files/resized/original-2640-2104059922-S-50-7201-3.jpg"
			],
			brand: {
				id: 8,
				name: "Roca",
				logo: "/brands/roca.png",
			},
			categories: [
				{ id: 10, name: "Ванны" },
				{ id: 5, name: "Для ванной" },
			],
			metadata: {
				isTopSales: true,
				isRecommended: true,
				rating: 4.9,
				reviewsCount: 28,
			},
			stock: {
				available: 4,
				inWarehouses: [
					{ id: 1, location: "Москва", quantity: 2 },
					{ id: 3, location: "Новосибирск", quantity: 1 },
					{ id: 4, location: "Екатеринбург", quantity: 1 },
				],
			},
		},
		{
			id: "i9j0k1l2-m3n4-5678-o9p0-q1r2s3t4u5v6",
			name: "Инсталляция для унитаза Geberit Duofix",
			prices: {
				retail: 328.99,
				wholesale: 279.99,
				currency: "USD",
				discount: null,
			},
			images: [
				"https://sanit.by/files/resized/original-2640-11384047419-S-50-7201-1.jpg",
				"https://sanit.by/files/resized/original-2640-2104059922-S-50-7201-3.jpg"
			],
			brand: {
				id: 9,
				name: "Geberit",
				logo: "/brands/geberit.png",
			},
			categories: [
				{ id: 11, name: "Инсталляции" },
				{ id: 2, name: "Унитазы" },
			],
			metadata: {
				isTopSales: false,
				isRecommended: true,
				rating: 4.7,
				reviewsCount: 19,
			},
			stock: {
				available: 11,
				inWarehouses: [
					{ id: 2, location: "Санкт-Петербург", quantity: 6 },
					{ id: 5, location: "Казань", quantity: 5 },
				],
			},
		},
		// Остальные товары (8 шт) с аналогичной структурой
		{
			id: "j0k1l2m3-n4o5-6789-p0q1-r2s3t4u5v6w7",
			name: "Сушилка для рук Dyson Airblade",
			prices: {
				retail: 499.99,
				wholesale: 429.99,
				currency: "USD",
				discount: 449.99,
			},
			images: [
				"https://sanit.by/files/resized/original-2640-11384047419-S-50-7201-1.jpg",
				"https://sanit.by/files/resized/original-2640-2104059922-S-50-7201-3.jpg"
			],
			brand: {
				id: 10,
				name: "Dyson",
				logo: "/brands/dyson.png",
			},
			categories: [
				{ id: 9, name: "Аксессуары" },
				{ id: 5, name: "Новинки 2024" },
			],
			metadata: {
				isTopSales: false,
				isRecommended: true,
				rating: 4.5,
				reviewsCount: 31,
			},
			stock: {
				available: 11,
				inWarehouses: [{ id: 2, location: "Санкт-Петербург", quantity: 11 }],
			},
		},
	],
	meta: {
		total: 10,
		filters: {
			brands: [
				{ id: 1, name: "Aurora", count: 2 },
				{ id: 2, name: "Vitra", count: 1 },
				{ id: 10, name: "Dyson", count: 1 },
			],
			categories: [
				{ id: 1, name: "Смесители", count: 1 },
				{ id: 2, name: "Унитазы", count: 1 },
				{ id: 9, name: "Аксессуары", count: 1 },
			],
			priceRange: {
				min: 89.99,
				max: 499.99,
			},
		},
	},
};

// Пример использования в React:
// function ProductList() {
// 	const { data: products, meta } = mockProducts;

// 	return (
// 		<div>
// 			<Filters brands={meta.filters.brands} />

// 			{products.map(product => (
// 				<ProductCard
// 					key={product.id}
// 					name={product.name}
// 					price={product.prices.discount || product.prices.retail}
// 					oldPrice={product.prices.discount ? product.prices.retail : null}
// 					brand={product.brand.name}
// 					isTop={product.metadata.isTopSales}
// 					isRecommended={product.metadata.isRecommended}
// 				/>
// 			))}
// 		</div>
// 	);
// }

export default mockProducts;
