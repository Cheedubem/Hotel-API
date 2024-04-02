import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";

// Authentication middleware
const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Implement authentication using JWT
};

// Authorization middleware for admin role
const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Implement authorization for admin role
};

export { authenticateUser, authorizeAdmin };

// Middleware for validating request data against schemas
const validateData =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    }
    next();
  };

// Define Joi schemas for validation
const roomTypeSchema = Joi.object({
  name: Joi.string().required(),
});

const roomSchema = Joi.object({
  name: Joi.string().required(),
  roomType: Joi.string().required(),
  price: Joi.number().required(),
});

export { validateData, roomTypeSchema, roomSchema };
