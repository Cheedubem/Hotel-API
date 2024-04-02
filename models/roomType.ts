import mongoose, { Schema, Document, Model } from "mongoose";

interface IRoomType extends Document {
  name: string;
}

const roomTypeSchema: Schema<IRoomType> = new Schema<IRoomType>({
  name: { type: String, required: true },
});

const RoomType: Model<IRoomType> = mongoose.model<IRoomType>(
  "RoomType",
  roomTypeSchema
);

export default RoomType;
