import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Tournament", tournamentSchema);
