const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const taskRoutes = require('./routes/tasks');
const auth = require('./routes/auth')
const display = require('./routes/displaydata')

const authMiddleWare = require('./middleware/auth-controler')


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // To allow cross-origin requests
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', auth);
app.use('/user',display)

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Sample Route (Test)
app.get('/', (req, res) => {
  res.send('API is running');
});

// Your task management routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
