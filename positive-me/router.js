'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const { Journal } = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res) => {
    console.log(req);
    const requiredFields = ['user', 'negativeThought', 'emojiValue1',
        'evidenceAgainstThought', 'positiveThought', 'emojiValue2'];
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
            res.status(500).json({ code: 500, message: 'Internal server error' });
        });
});

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['negativeThought', 'negativeFeeling', 'evidenceAgainstThought',
        'positiveThought', 'positiveFeeling', 'date'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body._id) {
        const message = (
            `Request path id (${req.params.id}) and request body id `
                `(${req.body._id}) must match`);
        console.error(message);
        return res.status(400).send(message);
    }
    Journal.findByIdAndUpdate(req.params.id, {
        $set: {
            id: req.params.id,
            negativeThought: req.body.negativeThought,
            negativeFeeling: req.body.negativeFeeling,
            evidenceAgainstThought: req.body.negativeEvidence,
            positiveThought: req.body.positiveThought,
            positiveFeeling: req.body.positiveFeeling,
            date: req.body.date
        }
    }, { new: true })
        .exec()
        .then(updated => res.status(200).json(updated))
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

router.get('/:user', (req, res) => {
    return Journal.find({ user: req.params.user })
        .sort({ date: -1 })
        .then(journals => res.json(journals))
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

router.delete('/:id', (req, res) => {
    return Journal.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

module.exports = { router };