REATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);
SELECT DISTINCT department FROM products;
INSERT INTO departments (name)
SELECT DISTINCT department
FROM products;


ALTER TABLE products ADD COLUMN department_id INT;

SET SQL_SAFE_UPDATES = 0;

UPDATE products p
JOIN departments d ON p.department = d.name
SET p.department_id = d.id;

SET SQL_SAFE_UPDATES = 1;



