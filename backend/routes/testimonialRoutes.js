const express = require('express');
const Testimonial = require('../models/Testimonial');

const router = express.Router();

// Get all testimonials
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;