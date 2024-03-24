const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const roomTypesRouter = require('./routes/roomTypes');
const roomsRouter = require('./routes/rooms');
const { authenticateUser, authorizeAdmin } = require('./middlewares/authMiddleware');
const { validateData, roomTypeSchema, roomSchema } = require('./middlewares/validationMiddleware');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hotel', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware for authentication and authorization
app.use(authenticateUser);
app.use('/api/v1/rooms-types', authorizeAdmin, validateData(roomTypeSchema), roomTypesRouter);
app.use('/api/v1/rooms', authorizeAdmin, validateData(roomSchema), roomsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
