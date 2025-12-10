import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, maxlength: 100 },
  description: { type: String, maxlength: 250 },
  permission: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }]
}, { timestamps: true }
);

export default mongoose.model("Role", roleSchema);