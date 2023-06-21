const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

// Middleware to parse JSON
app.use(express.json());

// Connect to PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
};

// Register new user
app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Log request body for debugging
    console.log('Request body:', req.body);

    // Validate username and password
    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        // Check if username already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (existingUser.rows.length > 0) {
            return res.status(400).send('Username already registered.');
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insert user into the database
        const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
        await pool.query(query, [username, hashedPassword]);
        res.status(201).json({message: "User registered successfully"});

    } catch (err) {
        console.error('Error registering user:', err);  // Log the error for debugging
        res.status(500).send('Error registering user.');
    }
});

// Log in
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        // Fetch user from database
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await pool.query(query, [username]);
        const user = result.rows[0];

        // Check password
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({token});
        } else {
            res.status(401).json({message: "Username or password incorrect"});
        }
    } catch (err) {
        res.status(500).send('Error logging in.');
    }
});

// Add product
app.post('/product', verifyToken, async (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const query = 'INSERT INTO products (name, price) VALUES ($1, $2)';
            await pool.query(query, [req.body.name, req.body.price]);
            res.json({message: "Product added successfully"});
        }
    });
});

// Edit product
app.put('/product/:id', verifyToken, async (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const query = 'UPDATE products SET name = $1, price = $2 WHERE id = $3';
            await pool.query(query, [req.body.name, req.body.price, req.params.id]);
            res.json({message: "Product updated successfully"});
        }
    });
});

// Get user information
app.get('/user', verifyToken, async (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const userId = authData.user.id;
                const query = 'SELECT * FROM users WHERE id = $1';
                const result = await pool.query(query, [userId]);
                
                // Make sure not to send the password back
                const userInfo = result.rows[0];
                delete userInfo.password;
                
                res.json(userInfo);
            } catch (err) {
                res.status(500).send('Error retrieving user information.');
            }
        }
    });
});