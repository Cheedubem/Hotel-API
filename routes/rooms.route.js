const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// POST endpoint to store room
router.post('/', async (req, res) => {
  try {
    const { name, roomType, price } = req.body;
    const room = new Room({ name, roomType, price });
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET endpoint to fetch all rooms with optional filters
router.get('/', async (req, res) => {
  try {
    const { search, roomType, minPrice, maxPrice } = req.query;
    let filters = {};
    if (search) filters.name = { $regex: search, $options: 'i' };
    if (roomType) filters.roomType = roomType;
    if (minPrice && maxPrice) filters.price = { $gte: minPrice, $lte: maxPrice };
    else if (maxPrice) filters.price = { $lte: maxPrice };
    else if (minPrice) filters.price = { $gte: minPrice };

    const rooms = await Room.find(filters);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH endpoint to edit a room by ID
router.patch('/:roomId', async (req, res) => {
  // Implementation for editing a room
});

// DELETE endpoint to delete a room by ID
router.delete('/:roomId', async (req, res) => {
  // Implementation for deleting a room
});

// GET endpoint to fetch a room by ID
router.get('/:roomId', async (req, res) => {
  // Implementation for fetching a room by ID
});

module.exports = router;
