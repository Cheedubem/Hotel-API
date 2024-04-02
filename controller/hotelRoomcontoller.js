"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomSchema = exports.roomTypeSchema = exports.validateData = exports.authorizeAdmin = exports.authenticateUser = void 0;
const joi_1 = __importDefault(require("joi"));
// Authentication middleware
const authenticateUser = (req, res, next) => {
    // Implement authentication using JWT
};
exports.authenticateUser = authenticateUser;
// Authorization middleware for admin role
const authorizeAdmin = (req, res, next) => {
    // Implement authorization for admin role
};
exports.authorizeAdmin = authorizeAdmin;
// Middleware for validating request data against schemas
const validateData = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    next();
};
exports.validateData = validateData;
// Define Joi schemas for validation
const roomTypeSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
});
exports.roomTypeSchema = roomTypeSchema;
const roomSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    roomType: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
});
exports.roomSchema = roomSchema;
