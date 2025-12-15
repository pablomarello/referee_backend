import express from 'express';
import { createMatchController, deleteMatchController, editMatchController, getAllMatchesController, getMatchByIdController } from '../controllers/matchesController.mjs';
import matchValidations from '../validations/matchValidation.mjs';
import { authMiddleware } from '../middlewares/authMiddleware.mjs';
import { hasPermission } from '../middlewares/authorizationMiddleware.mjs';


const router = express.Router();

router.get('/matches', getAllMatchesController);
router.post('/matches', authMiddleware, hasPermission('create:partidos'), matchValidations, createMatchController);
router.get('/matches/:id', getMatchByIdController);
router.patch('/matches/:id',authMiddleware, hasPermission('update:partidos'), matchValidations, editMatchController)
router.delete('/matches/:id',authMiddleware, hasPermission('delete:partidos'), deleteMatchController)

export default router;