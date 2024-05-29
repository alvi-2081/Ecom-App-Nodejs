const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();


// Connect to database
connectDB();

// // Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Routes
app.use('/api/auth', authRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
