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
	activationLink: {
		type: DataTypes.STRING,
		allowNull: false
	},
	isActivated: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	role: {
		type: DataTypes.STRING,
		defaultValue: "Guest"
	}
}, { timestamps: false });

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
		allowNull: true,
		references: {
			model: this.Category,
			key: 'id'
		}
	}
}, { timestamps: false });


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
}, { timestamps: false });

// const CategoryProduct = sequelize.define('category_product', {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true
// 	}
// }, { timestamps: false });

const CategoryBrand = sequelize.define('category_brand', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	categoryId: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: {
			model: Category,
			key: 'id'
		}
	},
	brandId: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: {
			model: Brand,
			key: 'id'
		}
	},
	productIdList: {
		type: DataTypes.ARRAY(DataTypes.UUID),
		allowNull: false
	}
}, { timestamps: false });	

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
	retailPrice: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	wholesalePrice: {
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
	}
}, { timestamps: false });

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
		type: DataTypes.UUID,
		allowNull: true
	},
	created_at: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, { timestamps: false });

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
		},
		allowNull: false
	},
	to: {
		type: DataTypes.UUID,
		references: {
			model: Store,
			key: 'id'
		},
		allowNull: true
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

const Discount = sequelize.define('discount', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	discountValue: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	from: {
		type: DataTypes.STRING,
		allowNull: false
	},
	to: {
		type: DataTypes.STRING,
		allowNull: false
	},
	brandId: {
		type: DataTypes.INTEGER,
		references: {
			model: Brand,
			key: 'id'
		},
		allowNull: true
	},
	categoryId: {
		type: DataTypes.INTEGER,
		references: {
			model: Category,
			key: 'id'
		},
		allowNull: true
	}, 
	productId: {
		type: DataTypes.UUID,
		references: {
			model: Product,
			key: 'id'
		}
	}
});

const Exchange = sequelize.define('exchange', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	currencyList: {
		type: DataTypes.JSON,
		allowNull: false
	},
	updated_at: {
		type: DataTypes.STRING,
		allowNull: false
	},
	created_at: {
		type: DataTypes.STRING,
		allowNull: false
	},
	brandId: {
		type: DataTypes.INTEGER,
		references: {
			model: Brand,
			key: "id",
			allowNull: true
		}
	},
	categoryId: {
		type: DataTypes.INTEGER,
		references: {
			model: Category,
			key: "id",
			allowNull: true
		}
	}
}, { timestamps: false });

const Token = sequelize.define('token', {
	refreshToken: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	user_id: {
		type: DataTypes.UUID,
		references: {
			model: User,
			key: "id",
			allowNull: false
		}
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

User.hasMany(Token);
Token.belongsTo(User);

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

//Discount
Brand.belongsToMany(Category, { through: Discount });
Category.belongsToMany(Brand, { through: Discount });
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
	Discount,
	Exchange, 
	Token
};