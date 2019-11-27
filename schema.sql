drop database if exists bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(7,2) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("Portable Laptop Screen", "Electronics", 249.99, 50),
("Eczema Lotion", "Skincare", 14.95, 250),
("Keyboard Cover", "Laptop Accessories", 8.95, 500),
("Magnetic Lashes", "Makeup", 9.99, 75),
("iPad", "Electronics", 999.99, 5),
("iPhone", "Electronics", 2095.89, 10),
("Heels", "Shoes", 39.85, 15),
("Black Opium", "Perfume", 49.75, 18),
("VS Bra", "Undergarments", 67.83, 120),
("Axe", "Deodorant", 6.99, 300);

SELECT * FROM bamazon.products;