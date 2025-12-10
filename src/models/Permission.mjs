import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, maxlength: 100 },
  description: { type: String, maxlength: 250 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Permission", permissionSchema);