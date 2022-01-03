const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/user.model');
const bcryptjs = require('bcryptjs')


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/FishTrack')

app.get('/hello', (req, res) => {
    res.send("hello express app")
})

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
            
        const hashPw = await bcryptjs.hash(req.body.password, 10);

        await User.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hashPw
        });

        res.json({status: 'ok'})
    } catch(err) {
        console.log(err)
        res.json({status: 'error', error: 'Could not create user'})
    }
    
})

app.post('/api/login', async (req, res) => {
    console.log(req.body)

    const user = await User.findOne({
        email: req.body.email,
    })

    if(!user) {
        res.json({
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
        res.json({status: 'ok', name: user.fname, user: token})
    } else {
        res.json({status: 'error', error: 'Incorrect Password'})
    }
    
})

app.listen(1337, () => {
    console.log("server started on port 1337")
})

