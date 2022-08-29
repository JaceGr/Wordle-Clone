const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Result = require('../Models/results.model');
const User = require('../Models/user.model');

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

/**
 * Creating a result to store a users score on a certain days puzzle.
 * 
 * Steps include verifying the JWT sent with the request,
 * checking that the user exists,
 * then creating the new record in the database.
 */
router.post('/', async (req, res) => {
    // Retrieve JWT from the request headers
    const token = req.headers.auth; 

    // Verify that the JWT has the correct signature. Return with an unauthorised response if invalid
    try {
        if(!jwt.verify(token, 'supersecret')) { // TODO: change supersecret to EnvVar
            console.log('Invalid JWT');
            res.status(401).json({error: "Invalid Credentials (Invalid JWT). Please try signing in again"});
            return;
        }
    } catch (err) {
        res.status(401).json({error: `Error thrown verifying token: ${err}`});
        console.log(err);
        return;
    }
    
    // Decode Token once it has been verified.
    const tokenDecoded = jwt.decode(token); 

    // Attempt to find a user with the details in the token sent.
    const user = await User.findOne({
        email: tokenDecoded.email,
    })

    // If no user exists then respond with an error response.
    if(user == null) {
        res.status(401).json({error: "Invalid Credentials (Unable to find user). Please try signing in again"});
        return;
    }

    // Create a new results with the given user and day and number of attempts. 
    try {
        await Result.create({
            userEmail: user.email,
            wordleDay: req.body.day,
            numAttempts: req.body.attempts,
        });
    } catch (err) {
        console.log(`Failed to store result due to: ${err}`);
        res.status(500).json({
            status: "Unable to store result"
        });
        return;
    }


    res.status(200).json({
        status: "Result Recorded"
    });
});

module.exports = router;