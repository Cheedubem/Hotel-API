import express from "express";
import bodyParser from "body-parser";
import roomTypesRouter from "./routes/roomType.route";
import roomsRouter from "./routes/rooms.route";
import Mongoose from "mongoose";

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
Mongoose.connect("mongodb://localhost:27017/hotel")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
