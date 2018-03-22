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
    emojiValue1: {
        type: Number,
        required: true
    },
    
    evidenceAgainstThought: {
        type: String,
        required: true
    },
    positiveThought: {
        type: String,
        required: true
    },
    emojiValue2: {
        type: Number,
        required: true
    }
});

const Journal = mongoose.model('Journal', JournalSchema);

module.exports = {Journal};