const mongoose = require('mongoose');

/**
 * Note that dates here are stored as a string. 
 * This was to remove the issue of mongoose storing dates as a JS Date (ISO strings storing to the second).
 * This application requires querying for a word that is the entire current day.
 * For this it was easier to implement as a string with no known drawbacks.
 * 
 */
const Answer = new mongoose.Schema(
    {
        answer: {type: String, required: true},
        wordleDay: {type: Number, required: true, unique: true},
        puzzleDate: {type: String, required: true, unique: true},
    }, {collection: 'answer-data'}
)

const model = mongoose.model('Answer', Answer);

module.exports = model;