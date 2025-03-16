const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// Submit a contact form
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Contact form submitted successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
