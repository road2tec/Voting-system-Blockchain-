const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/index');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// Database Connection
connectDB();

// Routes
app.use('/api/auth', userRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('Blockchain Voting System API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
