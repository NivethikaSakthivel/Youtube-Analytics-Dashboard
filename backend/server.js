const express = require('express');
const cors = require('cors');
const youtubeRoutes = require('./routes/youtubeRoutes'); // Ensure the path is correct
const dotenv = require('dotenv');
//const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Mount YouTube routes
app.use('/api/youtube', youtubeRoutes);

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log('MongoDB connection error:', err));

// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
