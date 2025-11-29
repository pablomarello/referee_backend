import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 60, },
  email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, "Formato de email inválido"] },
  password: { type: String, required: true, minlength: 8 },
  date_of_birth: { type: Date },

  role: { 
    type: String, 
    enum: ["coordinador", "arbitro"], 
    default: "arbitro",
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
