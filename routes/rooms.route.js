"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rooms_1 = __importDefault(require("../models/rooms"));
const router = express_1.default.Router();
// POST endpoint to store room
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, roomType, price } = req.body;
        const room = new rooms_1.default({ name, roomType, price });
        yield room.save();
        res.status(201).json(room);
    }
    catch (err) {
        // Specify 'any' type for 'err'
        res.status(400).json({ message: err.message });
    }
}));
// GET endpoint to fetch all rooms with optional filters
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, roomType, minPrice, maxPrice } = req.query;
        let filters = {};
        if (search)
            filters.name = { $regex: search, $options: "i" };
        if (roomType)
            filters.roomType = roomType;
        if (minPrice && maxPrice)
            filters.price = { $gte: minPrice, $lte: maxPrice };
        else if (maxPrice)
            filters.price = { $lte: maxPrice };
        else if (minPrice)
            filters.price = { $gte: minPrice };
        const rooms = yield rooms_1.default.find(filters);
        res.json(rooms);
    }
    catch (err) {
        // Specify 'any' type for 'err'
        res.status(500).json({ message: err.message });
    }
}));
// PATCH endpoint to edit a room by ID
router.patch("/:roomId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomId } = req.params;
        // Implementation for editing a room
        res.json({ message: "Room updated successfully" });
    }
    catch (err) {
        // Specify 'any' type for 'err'
        res.status(500).json({ message: err.message });
    }
}));
// DELETE endpoint to delete a room by ID
router.delete("/:roomId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomId } = req.params;
        yield rooms_1.default.findByIdAndDelete(roomId);
        res.json({ message: "Room deleted successfully" });
    }
    catch (err) {
        // Specify 'any' type for 'err'
        res.status(500).json({ message: err.message });
    }
}));
// GET endpoint to fetch a room by ID
router.get("/:roomId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomId } = req.params;
        const room = yield rooms_1.default.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json(room);
    }
    catch (err) {
        // Specify 'any' type for 'err'
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
