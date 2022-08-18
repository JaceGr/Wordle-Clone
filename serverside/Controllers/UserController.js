var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
const User = require('../Models/user.model');

/**
 * Registering a user
 */
router.post('/register', async (req, res) => {
    console.log(req.body)
    try { 
        const hashPw = await bcryptjs.hash(req.body.password, 10);

        await User.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hashPw
        });

        res.status(200).json({status: 'ok'})
    } catch(err) {
        console.log(err)
        res.status(500).json({status: 'error', error: 'Could not create user'})
    }
    
})

/**
 * Authenticating a user
 * 
 * Response contains jwt if authenticatoin succesful.
 * If unsuccesful will return a 401 error for unauthorised access..
 */
router.post('/login', async (req, res) => {
    console.log(req.body)

    const user = await User.findOne({
        email: req.body.email,
    })

    if(!user) {
        res.status(401).json({
            status: 'error', error: 'No user found'
        })
        return;
    }

    const pwValid = await bcryptjs.compare(req.body.password, user.password)

    if (user && pwValid) {
        const token = jwt.sign({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email
        },
            'supersecret'
        )
        res.status(200).json({status: 'ok', name: user.fname, user: token})
    } else {
        res.status(401).json({status: 'error', error: 'Incorrect Password'})
    }
    
})

module.exports = router;
