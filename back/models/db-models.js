const sequelize = require("../database/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define('user', {
	id: {
		type: DataTypes.UUID, 
		defaultValue: DataTypes.UUIDV4, 
		primaryKey: true
	},
	email: {
		type: DataTypes.STRING,
		unique: true
	},
	phone: {
		type: DataTypes.STRING,
		unique: true
	},
	name: {
		type: DataTypes.STRING
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	role: {
		type: DataTypes.STRING,
		defaultValue: "Guest"
	}
});

// const Card = sequelize.define('bank_card', {
// 	id: {
// 		type: DataTypes.UUID,
// 		primaryKey: true,
// 		defaultValue: DataTypes.UUIDV4
// 	},
// 	number: {
// 		type: DataTypes.STRING,
// 		allowNull: false,
// 		unique: true
// 	},
// 	password: {
// 		type: DataTypes.STRING,
// 		allowNull: false
// 	},
// 	user_id: {
// 		type: DataTypes.UUID,
// 		references: {
// 			model: User,
// 			key: "id"
// 		}
// 	}
// });

const Category = sequelize.define('category', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true, 
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	parentCategoryId: {
		type: DataTypes.INTEGER,
		allowNull: true
	}
});

const CategoryProduct = sequelize.define('category_product', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}
});

const Brand = sequelize.define('brand', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING,
		unique: true, 
		allowNull: false
	}
});

const CategoryBrand = sequelize.define('category_brand', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	discountPercent: {
		type: DataTypes.FLOAT,
		defaultValue: 0
	}
});

const Product = sequelize.define('product', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	optPrice: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	priceCurrency: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "USD"
	},
	images: {
		type: DataTypes.ARRAY(DataTypes.STRING)
	},
	brandId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	totalQuantity: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	// categoryId: {
	// 	type: DataTypes.INTEGER,
	// 	allowNull: false
	// }
});

const Order = sequelize.define('order', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	user_id: {
		type: DataTypes.UUID,
		references: {
			model: User,
			key: "id"
		}
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	isOpened: {
		type: DataTypes.BOOLEAN,
		defaultValue: true
	},
	deliveryAddress: {
		type: DataTypes.STRING,
		allowNull: true
	} 
});

const ProductOrder = sequelize.define('product_order', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	}, 
	order_id: {
		type: DataTypes.UUID,
		references: {
			model: Order,
			key: "id"
		}
	},
	product_id: {
		type: DataTypes.UUID,
		references: {
			model: Product,
			key: "id"
		}
	},
	ordered_product_quantity: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	delivered_product_quantity: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
});

const Store = sequelize.define('store', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	location: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

const ProductStore = sequelize.define("product_store", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	product_quantity: {
		type: DataTypes.INTEGER
	},
	product_id: {
		type: DataTypes.UUID,
		references: {
			model: Product,
			key: "id"
		}
	},
	store_id: {
		type: DataTypes.UUID,
		references: {
			model: Store,
			key: "id"
		}
	}
});

const OrderStore = sequelize.define('order_store', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	order_id: {
		type: DataTypes.UUID,
		references: {
			model: Order,
			key: "id"
		}
	},
	from: {
		type: DataTypes.UUID,
		references: {
			model: Store,
			key: "id"
		}
	},
	to: {
		type: DataTypes.UUID,
		references: {
			model: Store,
			key: 'id'
		}
	}
});

const ProductInfo = sequelize.define('product_info', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false
	},
	user_id: {
		type: DataTypes.UUID,
		references: {
			model: User,
			key: "id"
		}
	}
});

const Exchange = sequelize.define('exchange', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	USD: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	EUR: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	updated_at: {
		type: DataTypes.STRING,
		allowNull: false
	},
	created_at: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, { timestamps: false });

User.hasMany(Order, {
	foreignKey: 'user_id'
});
Order.belongsTo(User);

Category.hasMany(Product, {
	foreignKey: "categoryId"
});
Product.belongsTo(Category);

Product.hasMany(ProductInfo);
ProductInfo.belongsTo(Product);	

Brand.hasMany(Product);
Product.belongsTo(Brand);

Category.hasMany(Category, {
	foreignKey: "parentCategoryId"
});
Category.belongsTo(Category);

//ProductStore
Store.belongsToMany(Product,{ through: ProductStore});
Product.belongsToMany(Store, { through: ProductStore });

//ProductOrder
Product.belongsToMany(Order, { through: ProductOrder });
Order.belongsToMany(Product, { through: ProductOrder });

//OrderStore
Order.belongsToMany(Store, { through: OrderStore });
Store.belongsToMany(Order, { through: OrderStore });

//CategoryBrand
Brand.belongsToMany(Category, { through: CategoryBrand });
Category.belongsToMany(Brand, { through: CategoryBrand });

//CategoryProduct
Product.belongsToMany(Category, { through: CategoryProduct });
Category.belongsToMany(Product, { through: CategoryProduct });

module.exports = {
	User,
	Category,
	Brand,
	Product,
	ProductOrder,
	Store,
	ProductStore,
	Order,
	OrderStore,
	ProductInfo,
	CategoryBrand,
	CategoryProduct,
	Exchange
};