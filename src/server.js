/* SST */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const port = 3000;
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/players-api");

const UserController = require('./controllers/UserController');
app.use('/api/user', UserController);
//should handle login
app.use('/api', UserController);

const PlayerController = require('./controllers/PlayerController');
app.use('/api/players', PlayerController);
	
//const port = process.env.port || 3000;
const server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

module.exports = server;
