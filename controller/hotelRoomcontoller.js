const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Implement authentication using JWT
};

const authorizeAdmin = (req, res, next) => {
  // Implement authorization for admin role
};

module.exports = { authenticateUser, authorizeAdmin };


const Joi = require('joi');

const validateData = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const roomTypeSchema = Joi.object({
  name: Joi.string().required()
});

const roomSchema = Joi.object({
  name: Joi.string().required(),
  roomType: Joi.string().required(),
  price: Joi.number().required()
});

module.exports = { validateData, roomTypeSchema, roomSchema };
