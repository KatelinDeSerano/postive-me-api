'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const JournalSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    negativeThought: {
        type: String,
        required: true 
    },
    negativeFeeling: {
        type: Number,
        required: true
    },
    negativeEvidence: {
        type: String,
        required: true
    },
    alternativeEvidence: {
        type: String,
        required: true
    },
    positiveThought: {
        type: String,
        required: true
    },
    positiveFeeling: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Journal = mongoose.model('Journal', JournalSchema);

module.exports = {Journal};