import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/dbConfig.mjs';
import userRoutes from './src/routes/userRoutes.mjs';
import matchesRoutes from './src/routes/matchRoutes.mjs'
import tournamentRoutes from './src/routes/tournamentRoutes.mjs'
import assignmentRoutes from './src/routes/assignmentRoutes.mjs'

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());

//conexión a mongodb
connectDB();

//configuración de rutas
app.use('/api', userRoutes);
app.use('/api', matchesRoutes);
app.use('/api', tournamentRoutes);
app.use('/api', assignmentRoutes);

// Middleware para parsear los datos del cuerpo (body) de los formularios
app.use(express.urlencoded({ extended: true }));

//Iniciar servidor
app.listen(PORT, () =>{
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});