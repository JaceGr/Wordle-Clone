var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Answer = require('./models/answer.model');

var fs = require('fs');
var readline = require('readline');

// Endpoint for a single test-word "TRUCK".
router.get('/test-word', async (req, res) => {
    res.status(200).send({word: 'TRUCK'});
})

/**
 * Endpoint to return a json object of the current days word, date and dayNum.
 * 
 * If a word doesnt exist, return 
 */
router.get('/todays-word', async (req, res) => {
    const today = new Date().toLocaleDateString();
    const word = await Answer.findOne({
        puzzleDate: today
    });
    if(word) {
        res.status(200).json(word);
    } else {
        res.status(404).json({error: "Word not found"});
    }
})

// Endpoint to seed words into the database.
router.post('/seed-from-asset', async (req, res) => {
    try {
        readAssetFile('Assets/FullWordList.txt');
        res.status(200).json({status: 'Seeded'});
    } catch (err) {
        res.status(500).json({error: err})
    }
})

/**
 * 
 * @param {*} file is an asset file stored in the server source code that contains all of the words.
 * 
 * This function will process the file and call a function to process the data of each line.
 */
const readAssetFile = (file) => {

    var rd = readline.createInterface({
        input: fs.createReadStream(file),
        output: false,
        console: false
    });

    rd.on('line', async function(line) {
        await processAssetFileLine(line);
    });
}

/**
 * 
 * @param {*} line: a string that is an entire line from the asset file supplied
 * line format: <Date>, <dayNum> <word> [*]
 * asterisk represents the word changing previously so may be different in different word lists.
 * 
 * Used to split each line from the Asset file and create a new database row for each valid entry.
 */
const processAssetFileLine = async (line) => {
    // Check if line is null or empty string using == instead of ===
    if (line == null || line === "") {
        return;
    }
   
    // Split the line by comma into [date, day+word]
    const lineSplit = line.split(",");
    // Ensure valid date format
    const date = new Date(lineSplit[0]).toLocaleDateString();
    if (date == 'Invalid Date') {
        console.log(`Invalid date in line: ${line}`);
        return;
    }
   
    // Split the day+word string by *space* into [day, word]
    const dayWordSplit = lineSplit[1].split(" ");
    // Check that elements are dayNum, word and possibly an asterisk detailing a word that has changed.
    if(dayWordSplit.length > 3 || dayWordSplit.length < 2) {
        console.log("Error in line: " + line);
        return;
    }
    const dayNum = dayWordSplit[0];
    const answer = dayWordSplit[1];

    // Add each aswer object to the database. 
    try{
        await Answer.create({
            answer: answer,
            wordleDay: dayNum,
            puzzleDate: date,
        });
    } catch (err) {
        if (err.code == 11000) {
         console.log(`Seed Failed: Word already exists for this date. ${err.message}`);
        } else {
            /**
             * Shoutout to the perosn who gave the word list. 
             * Funny story, they left 2 invalid dates Dec 32 and 33.
             * These also had duplicate keys for the day number.
             * Better yet the words were 'Dont' 'Repost'.
             * They left there errors in the dataset for devs to find when trying to work with the data
             * and the message was 'Dont Repost' ahaha. 
             * 
             * Luckily I validated all the data ahaha.  
             */ 
            console.log(`Seed Failed in: ${line}. Err: ${err.message}`)
        }
    }
}

module.exports = router;
