CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
    itemID INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR (100) NOT NULL,
    price DECIMAL (8,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (itemID)
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("POP! Figures", "Toys", 9.99, 20),
    ("Teddy Bear", "Toys", 8.99, 50),
    ("Water", "Grocery", 2.99, 100),
    ("Chocolate Hearts", "Grocery", 29.99, 500),
    ("White T-Shirt", "Apparel", 5.99, 100),
    ("White Socks", "Apparel", 6.99, 1000),
    ("Push Pins", "Office Supplies", 1.00, 1000),
    ("Black Ink Pen", "Office Supplies", 1.99, 1000),
    ("Tennis Balls", "Sporting Goods", 3.99, 100),
    ("Golf Club", "Sporting Goods", 79.00, 50)