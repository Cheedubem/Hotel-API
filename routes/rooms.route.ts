import express, { Request, Response } from "express";
import Room from "../models/rooms";

const router = express.Router();

// POST endpoint to store room
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, roomType, price } = req.body;
    const room = new Room({ name, roomType, price });
    await room.save();
    res.status(201).json(room);
  } catch (err: any) {
    // Specify 'any' type for 'err'
    res.status(400).json({ message: err.message });
  }
});

// GET endpoint to fetch all rooms with optional filters
router.get("/", async (req: Request, res: Response) => {
  try {
    const { search, roomType, minPrice, maxPrice } = req.query;
    let filters: any = {};
    if (search) filters.name = { $regex: search, $options: "i" };
    if (roomType) filters.roomType = roomType;
    if (minPrice && maxPrice)
      filters.price = { $gte: minPrice, $lte: maxPrice };
    else if (maxPrice) filters.price = { $lte: maxPrice };
    else if (minPrice) filters.price = { $gte: minPrice };

    const rooms = await Room.find(filters);
    res.json(rooms);
  } catch (err: any) {
    // Specify 'any' type for 'err'
    res.status(500).json({ message: err.message });
  }
});

// PATCH endpoint to edit a room by ID
router.patch("/:roomId", async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    // Implementation for editing a room
    res.json({ message: "Room updated successfully" });
  } catch (err: any) {
    // Specify 'any' type for 'err'
    res.status(500).json({ message: err.message });
  }
});

// DELETE endpoint to delete a room by ID
router.delete("/:roomId", async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    await Room.findByIdAndDelete(roomId);
    res.json({ message: "Room deleted successfully" });
  } catch (err: any) {
    // Specify 'any' type for 'err'
    res.status(500).json({ message: err.message });
  }
});

// GET endpoint to fetch a room by ID
router.get("/:roomId", async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (err: any) {
    // Specify 'any' type for 'err'
    res.status(500).json({ message: err.message });
  }
});

export default router;
