/* SST */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
// const port = 3000;

/////////////////////////////////////////////////////////////////
//Requesting for http and fs modules
/* var http = require('http');
var fs = require('fs');

//creating the server and reading the file synchronously
var server = http.createServer(function(req, res) {
    res.end(fs.readFileSync('./config/postman_collection.json'));
}).listen(3000);

//creating the client which connects to local host at port number 3000
var options = {
    hostname: 'localhost',
    port: '3000',
}

//getting the data from server, storing it in to a variable, and printing at end of the data
function getResponse(response){
    var serverData='';
    response.on('data', function(chunk){
            serverData += chunk;
    });
response.on('end', function(){
            console.log(serverData);
    });
};

http.request(options, function(response, error){
    getResponse(response);
}).end(); */
/////////////////////////////////////////////////////////////////

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
	
const port = dotenv.port || 3000;
const server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
}); 

module.exports = server;
