const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Result = require('../Models/results.model');
const User = require('../Models/user.model');

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

/**
 * Creating a result to store a users score on a certain days puzzle.
 */
router.post('/', async (req, res) => {

    // Determine the logged in user that has sent this request.
    const tokenDecoded = findUser(req);
    if(tokenDecoded === null) {
        res.status(401).json({
            message: "User authentication error. Please sign in again."
        });
        return;
    }

    // Create a new results with the given user and day and number of attempts. 
    try {
        await Result.create({
            userEmail: tokenDecoded.email,
            wordleDay: req.body.day,
            numAttempts: req.body.attempts,
        });
    } catch (err) {
        console.log(`Failed to store result due to: ${err}`);
        res.status(500).json({
            message: "Unable to store result"
        });
        return;
    }


    res.status(200).json({
        message: "Result Recorded"
    });
});

/**
 * Requesting to determine if a user has attempted a particular days puzzle. 
 * 
 * If the user has attempted the provided days puzzle, the number of attempts will be returned. 
 * Else, 0 will be returned for NoScore.
 */
router.get('/:day', async (req, res) => {

    // Determine the logged in user that has sent this request.
    const tokenDecoded = findUser(req);
    if(tokenDecoded === null) {
        res.status(401).json({
            message: "User authentication error. Please sign in again."
        });
        return;
    }

    // Attempt to find a result with the details in the request.
    const score = await Result.findOne({
        userEmail: tokenDecoded.email,
        wordleDay: req.params.day,
    })

    // If no result exists then respond with no score recorded response.
    if(score == null) {
        res.status(200).json({
            result: 0
        });
        return;
    }

    res.status(200).json({
        result: score.numAttempts
    })
})

/**
 * Verifying that a bearer JWT token with the correct signature is in the request headers.
 * If valid and verified, the JWT is decoded and returned. If any error  then null is returned.
 * 
 * @param req The request object from the controller endpoint parameter.
 * @returns Decoded JWT if verified and validated. Null otherwise.
 */
const findUser = (req) => {
    
    // Check if the token was sent
    if(req.headers.authorization == null) {
        console.log("No bearer token sent with request.")
        return null;
    }

    // Retrieve bearer token
    let token;
    try {
        token = req.headers.authorization.split(" ")[1];
    } catch (err) {
        console.log(`Error with token format: ${err}`);
        return null;
    }

    // Verify the token signature, returning null if invalid signature.
    try {
        if(!jwt.verify(token, 'supersecret')) { // TODO: change supersecret to EnvVar
            console.log('Invalid JWT');
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }

    // Decode Token once it has been verified and return from function.
    return jwt.decode(token); 
}
module.exports = router;