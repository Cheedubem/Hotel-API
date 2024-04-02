import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface IRoom extends Document {
  name: string;
  roomType: Types.ObjectId;
  price: number;
}

const roomSchema: Schema<IRoom> = new Schema<IRoom>({
  name: { type: String, required: true },
  roomType: { type: Schema.Types.ObjectId, ref: "RoomType", required: true },
  price: { type: Number, required: true },
});

const Room: Model<IRoom> = mongoose.model<IRoom>("Room", roomSchema);

export default Room;
