// Configure environment variables
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

app.use(express.json());

// Connect to Database using Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT, // <-- set the dialect dynamically
  port: process.env.DB_PORT, // <-- added port
});

// Define the User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

// Define the Product model
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
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
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    await User.create({ username, password: hashedPassword });
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
    const user = await User.findOne({ where: { username } });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
  jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { name, price } = req.body;

      try {
        await Product.create({ name, price });
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
  jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const productId = req.params.id;
      const { name, price } = req.body;

      try {
        await Product.update({ name, price }, { where: { id: productId } });
        res.json({ message: 'Product updated successfully' });
      } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send('Error updating product.');
      }
    }
  });
});

// Dashboard routes

// Get all users
app.get('/dashboard/users', verifyToken, async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const users = await User.findAll();
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
  jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const products = await Product.findAll();
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
  jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const userId = req.params.id;

      try {
        const user = await User.findByPk(userId);
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
  jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const userId = req.params.id;
      const { username } = req.body;

      try {
        await User.update({ username }, { where: { id: userId } });
        res.json({ message: 'User updated successfully' });
      } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Error updating user.');
      }
    }
  });
});

// Sync models with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});