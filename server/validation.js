const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'grace-shopper-project',
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

// Register new user with admin privileges
app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
  
    // Validate username, password, and role
    if (!username || !password || !role) {
      return res.status(400).send('Username, password, and role are required.');
    }
  
    try {
      // Check if username already exists
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      if (existingUser.rows.length > 0) {
        return res.status(400).send('Username already registered.');
      }
  
      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      // Insert user into the database with role
      const query = 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)';
      await pool.query(query, [username, hashedPassword, role]);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Error registering user.');
    }
  });

// Log in
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user from database
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    const user = result.rows[0];

    // Check password
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Username or password incorrect' });
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
      const { name, price } = req.body;

      try {
        // Insert product into the database
        const query = 'INSERT INTO products (name, price) VALUES ($1, $2)';
        await pool.query(query, [name, price]);
        res.json({ message: 'Product added successfully' });
      } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).send('Error adding product.');
      }
    }
  });
});

// Edit product
app.put('/product/:id', verifyToken, async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const productId = req.params.id;
      const { name, price } = req.body;

      try {
        // Update product in the database
        const query =
          'UPDATE products SET name = $1, price = $2 WHERE id = $3';
        await pool.query(query, [name, price, productId]);
        res.json({ message: 'Product updated successfully' });
      } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send('Error updating product.');
      }
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
        console.error('Error retrieving user information:', err);
        res.status(500).send('Error retrieving user information.');
      }
    }
  });
});

// Dashboard routes

// Get all users
app.get('/dashboard/users', verifyToken, async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const query = 'SELECT * FROM users';
        const result = await pool.query(query);
        const users = result.rows;

        res.json(users);
      } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).send('Error retrieving users.');
      }
    }
  });
});

// Get all products
app.get('/dashboard/products', verifyToken, async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const query = 'SELECT * FROM products';
        const result = await pool.query(query);
        const products = result.rows;

        res.json(products);
      } catch (err) {
        console.error('Error retrieving products:', err);
        res.status(500).send('Error retrieving products.');
      }
    }
  });
});

// Get user by ID
app.get('/dashboard/users/:id', verifyToken, async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const userId = req.params.id;

      try {
        const query = 'SELECT * FROM users WHERE id = $1';
        const result = await pool.query(query, [userId]);
        const user = result.rows[0];

        res.json(user);
      } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(500).send('Error retrieving user.');
      }
    }
  });
});

// Update user by ID
app.put('/dashboard/users/:id', verifyToken, async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const userId = req.params.id;
      const { username, email } = req.body;

      try {
        const query =
          'UPDATE users SET username = $1, email = $2 WHERE id = $3';
        await pool.query(query, [username, email, userId]);

        res.json({ message: 'User updated successfully' });
      } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Error updating user.');
      }
    }
  });
});

// Start the server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});