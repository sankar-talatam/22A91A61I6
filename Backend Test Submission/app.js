const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());
app.use(logger);
app.use('/shorturls', urlRoutes);

module.exports = app;
