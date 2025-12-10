import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 60, },
  email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, "Formato de email inválido"] },
  password: { type: String, required: true, minlength: 8 },
  date_of_birth: { type: Date },

  role: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true
  },

  type_referee: { 
    type: String, 
    enum: ["principal", "asistente"], 
    default: "principal"
  },

  active: { type: Boolean, default: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
