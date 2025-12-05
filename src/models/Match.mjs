import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  date: { type: Date },
  home_team: { type: String, required: true },
  away_team: { type: String, required: true },
  location: { type: String, required: true },

  category: { 
    type: String,
    enum: ['primera', 'femenino', '3era', '5ta', '6ta', 'infantiles_A', 'infantiles_B'],
    required: true
  },

  tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
  // tournament: { type: String },

  referee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assistant1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assistant2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  score_home: { type: Number, default: 0 },
  score_away: { type: Number, default: 0 },

  status: { 
    type: String,
    enum: ["scheduled", "in_progress", "completed", "suspended"],
    default: "scheduled"
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Match", matchSchema);