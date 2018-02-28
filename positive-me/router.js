'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {Journal} = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['negativeThought', 'negativeFeeling','negativeEvidence', 
        'alternativeEvidence', 'positiveThought', 'positiveFeeling', 'date'];
    const missingField = requiredFields.find(field => !(field in req.body));

    if (missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }

    return Journal.create(req.body)
    .then(journal => {
        return res.status(201).json(journal);
    })
    .catch(err => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
        if (err.reason === 'ValidationError') {
            return res.status(err.code).json(err);
        }
        res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

// Never expose all your journals like below in a prod application
// we're just doing this so we have a quick way to see
// if we're creating users. keep in mind, you can also
// verify this in the Mongo shell.
router.get('/', (req, res) => {
    return Journal.find()
        .then(journals => res.json(journals.map(journal => journal)))
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.delete('/:id', (req, res) => {
    return Journal.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};