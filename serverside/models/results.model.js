const mongoose = require('mongoose');

/**
 * The schema used to store the number of attempts it takes each user to finish this days puzzle.
 */
 const Results = new mongoose.Schema({
        userEmail: {type: String, required: true},
        wordleDay: {type: Number, required: true},
        numAttempts: {type: Number, required: true},
    }, {collection: 'puzzle-day-results'}
)

const model = mongoose.model('Results', Results);

module.exports = model;