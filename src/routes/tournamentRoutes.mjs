import express from 'express';
import { createTournamentController, getAllTournamentsController } from '../controllers/tournamentsController.mjs';


const router = express.Router();

router.get('/tournaments', getAllTournamentsController);
router.post('/tournaments', createTournamentController);

export default router;