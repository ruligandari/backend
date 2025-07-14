// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api', routes);

module.exports = app;
