CREATE DATABASE test1;

CREATE TABLE users(
    userID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO users(name, email)
VALUES('Alice', 'alice@example.com'),
    ('Bob', 'bob@example.com');

SELECT userID, name, email
FROM users
WHERE name = 'Alice';

UPDATE users
SET email = 'alice@newdomain.com'
WHERE userID = ?;

DELETE FROM users
WHERE userID = ?;

CREATE TABLE orders(
    orderID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_date DATE NOT NULL,
    user_Id INT REFERENCES users(userID)
);

SELECT users.name, orders.order_date
FROM users
Join orders ON users.userID = orders.user_Id;

