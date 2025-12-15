import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  home_team: { type: String, required: true },
  away_team: { type: String, required: true },
  location: { type: String, required: true },

  category: { 
    type: String,
    enum: ['primera', 'femenino', '3era', '5ta', '6ta', 'infantiles_A', 'infantiles_B'],
    required: true
  },

  tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },

  score_home: { type: Number, default: 0 },
  score_away: { type: Number, default: 0 },

  status: { 
    type: String,
    enum: ["programado", "en progreso", "finalizado", "suspendido"],
    default: "programado"
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Match", matchSchema);