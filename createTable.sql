create database ecom;
use  ecom;
CREATE TABLE products (
  id INT PRIMARY KEY,
  cost DECIMAL(10,4),
  category VARCHAR(100),
  name TEXT,
  brand VARCHAR(50),
  retail_price DECIMAL(10,2),
  department VARCHAR(50),
  sku CHAR(32),
  distribution_center_id INT
);

SELECT * from products limit 10;

