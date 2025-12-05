import express from 'express';
import { createMatchController, deleteMatchController, editMatchController, getAllMatchesController, getMatchByIdController } from '../controllers/matchesController.mjs';
import matchValidations from '../validations/matchValidation.mjs';


const router = express.Router();

router.get('/matches', getAllMatchesController);
router.post('/matches',matchValidations, createMatchController);
router.get('/matches/:id', getMatchByIdController);
router.patch('/matches/:id',matchValidations, editMatchController)
router.delete('/matches/:id', deleteMatchController)

export default router;