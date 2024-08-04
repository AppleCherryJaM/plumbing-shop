CREATE TABLE category(
	category_id SERIAL PRIMARY KEY,
	name VARCHAR(255)
);

CREATE TABLE product(
	product_id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	price INTEGER,
	category_id INTEGER REFERENCES category(category_id)
);
-- CREATE TABLE role(
-- 	role_id SERIAL PRIMARY KEY,
-- 	name VARCHAR(255)
-- );

CREATE TABLE person(
	user_id SERIAL PRIMARY KEY,
	first_name VARCHAR(255),
	second_name VARCHAR(255),
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	phone_number VARCHAR(255) UNIQUE,
	role VARCHAR(255),
	salary_politics INTEGER
);

CREATE TABLE store(
	store_id SERIAL PRIMARY KEY, 
	store_name VARCHAR(255),
	address VARCHAR(255)
);

CREATE TABLE transaction(
	order_id SERIAL PRIMARY KEY,
	product_id INTEGER NOT NULL REFERENCES product(product_id),
	user_id INTEGER REFERENCES person(user_id),
	quantity_of_product INTEGER
);

CREATE TABLE order_store(
	transaction_id SERIAL PRIMARY KEY,
	order_id INTEGER REFERENCES transaction(order_id),
	store1_id INTEGER REFERENCES store(store_id),
	store2_id INTEGER REFERENCES store(store_id)
);

CREATE TABLE product_store(
	id SERIAL PRIMARY KEY,
	product_id INTEGER NOT NULL REFERENCES product(product_id),
	store_id INTEGER NOT NULL REFERENCES store(store_id),
	quantity_of_product INTEGER 
);