import express from 'express';
import { createAssignmentController, deleteAssignmentController, editAssignmentController, getAllAssignmentsController, getAssignmentByIdController } from '../controllers/assignmentsController.mjs';
import assignmentValidations from '../validations/assignmentValidation.mjs';


const router = express.Router();

router.get('/assignments', getAllAssignmentsController);
router.post('/assignments', assignmentValidations, createAssignmentController);
router.get('/assignments/:id', getAssignmentByIdController);
router.patch('/assignments/:id', assignmentValidations, editAssignmentController);
router.delete('/assignments/:id', deleteAssignmentController);

export default router;