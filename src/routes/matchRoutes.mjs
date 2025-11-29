import express from 'express';
import { createMatchController, getAllMatchesController } from '../controllers/matchesController.mjs';


const router = express.Router();

router.get('/matches', getAllMatchesController);
router.post('/matches', createMatchController);

export default router;