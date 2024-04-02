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
const roomType_1 = __importDefault(require("../models/roomType"));
const router = express_1.default.Router();
// POST endpoint to store room type
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const roomType = new roomType_1.default({ name });
        yield roomType.save();
        res.status(201).json(roomType);
    }
    catch (err) {
        // Specify 'any' type for 'err'
        res.status(400).json({ message: err.message });
    }
}));
// GET endpoint to fetch all room types
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomTypes = yield roomType_1.default.find();
        res.json(roomTypes);
    }
    catch (err) {
        // Specify 'any' type for 'err'
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
