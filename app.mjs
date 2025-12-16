import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from './src/config/dbConfig.mjs';
import userRoutes from './src/routes/userRoutes.mjs';
import matchesRoutes from './src/routes/matchRoutes.mjs'
import tournamentRoutes from './src/routes/tournamentRoutes.mjs'
import assignmentRoutes from './src/routes/assignmentRoutes.mjs'
import authRoutes from './src/routes/authRoutes.mjs';
import permissionRoutes from './src/routes/permissionRoutes.mjs';
import rolesRoutes from './src/routes/rolesRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "https://referee-frontend.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // permitir requests sin origin (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//conexión a mongodb
connectDB();

//configuración de rutas
app.use('/api', userRoutes);
app.use('/api', matchesRoutes);
app.use('/api', tournamentRoutes);
app.use('/api', assignmentRoutes);
app.use('/api', authRoutes);
app.use('/api', permissionRoutes);
app.use('/api', rolesRoutes);

//Iniciar servidor
app.listen(PORT, () =>{
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});