const express = require('express');
const router = express.Router();
const RoomType = require('../models/RoomType');

// POST endpoint to store room type
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const roomType = new RoomType({ name });
    await roomType.save();
    res.status(201).json(roomType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET endpoint to fetch all room types
router.get('/', async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    res.json(roomTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
