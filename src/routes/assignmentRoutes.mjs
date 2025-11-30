import express from 'express';
import { createAssignmentController, getAllAssignmentsController } from '../controllers/assignmentsController.mjs';


const router = express.Router();

router.get('/assignments', getAllAssignmentsController);
router.post('/assignments', createAssignmentController);

export default router;