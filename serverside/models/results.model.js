const mongoose = require('mongoose');

/**
 * The schema used to store the number of attempts it takes each user to finish this days puzzle.
 * 
 * There is a composite index to ensure that each user can only have 1 result stored for each day.
 */
 const Results = new mongoose.Schema({
        userEmail: {type: String, required: true},
        wordleDay: {type: Number, required: true},
        numAttempts: {type: Number, required: true},
    }, {collection: 'puzzle-day-results'}
)

Results.index({ userEmail: 1, wordleDay: 1}, { unique: true });

const model = mongoose.model('Results', Results);

module.exports = model;