const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://contact-management-app-gcq2.onrender.com', 'https://your-netlify-site.netlify.app'] // Add your actual frontend URLs
    : 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Routes
app.use('/api/contacts', require('./routes/contactRoutes'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));