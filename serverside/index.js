const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

var seed = require('./Controllers/SeedController.js');
var user = require('./Controllers/UserController.js');
var results = require('./Controllers/ResultController.js')

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/FishTrack')

// Include User Controller for login and registration end points.
app.use('/user', user);

// Including Seed Controller for client retrieving a puzzle word and database seeding.
app.use('/seed', seed);

// Include Results Controller for saving and fetching users results.
app.use('/results', results);

app.listen(1337, () => {
    console.log("server started on port 1337")
})

