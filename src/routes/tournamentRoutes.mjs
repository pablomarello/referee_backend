import express from 'express';
import { createTournamentController, editTournamentController, getAllTournamentsController, getTournamentByIdController } from '../controllers/tournamentsController.mjs';
import tournamentValidations from '../validations/tournamentValidation.mjs';


const router = express.Router();

router.get('/tournaments', getAllTournamentsController);
router.post('/tournaments',tournamentValidations, createTournamentController);
router.get('/tournaments/:id', getTournamentByIdController);
router.patch('/tournaments/:id',tournamentValidations, editTournamentController);
// router.delete('/tournaments/:id', deleteTournamentController);

export default router;