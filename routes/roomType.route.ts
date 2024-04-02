import express, { Request, Response } from "express";
import RoomType from "../models/roomType";

const router = express.Router();

// POST endpoint to store room type
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const roomType = new RoomType({ name });
    await roomType.save();
    res.status(201).json(roomType);
  } catch (err: any) {
    // Specify 'any' type for 'err'
    res.status(400).json({ message: err.message });
  }
});

// GET endpoint to fetch all room types
router.get("/", async (req: Request, res: Response) => {
  try {
    const roomTypes = await RoomType.find();
    res.json(roomTypes);
  } catch (err: any) {
    // Specify 'any' type for 'err'
    res.status(500).json({ message: err.message });
  }
});

export default router;
