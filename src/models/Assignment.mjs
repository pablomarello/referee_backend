import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  match_id: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
  referee_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assistant1_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assistant2_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  observations: { type: String },
  assignedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Assignment", assignmentSchema);
