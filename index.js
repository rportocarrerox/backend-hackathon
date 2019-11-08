const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// create self invocation
const cors = require('cors');
app.use(cors());
app.options('*', cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useUnifiedTopology: true,
        useNewUrlParser: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/prueba', (req, res) => {
    res.json({"message": "Welcome to Hackathon BBVA."});
});

var user = require('./user/userRoutes');
app.use('/user', user);

var comercio = require('./comercio/comercioRoutes');
app.use('/comercio', comercio);

var pago = require('./pago/pagoRoutes');
app.use('/pago', pago);

var login = require('./login/login');
app.use('/', login)

// listen for requests
app.listen(process.env.PORT || 5000);
() => {
    console.log("http://localhost:5000", err);
};
