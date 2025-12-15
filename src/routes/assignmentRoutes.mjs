import express from 'express';
import { createAssignmentController, deleteAssignmentController, editAssignmentController, getAllAssignmentsController, getAssignmentByIdController } from '../controllers/assignmentsController.mjs';
import assignmentValidations from '../validations/assignmentValidation.mjs';
import { authMiddleware } from '../middlewares/authMiddleware.mjs';
import { hasPermission } from '../middlewares/authorizationMiddleware.mjs';


const router = express.Router();

router.get('/assignments', authMiddleware, hasPermission('read:designaciones'), getAllAssignmentsController);
router.post('/assignments', authMiddleware, hasPermission('create:designaciones'), assignmentValidations, createAssignmentController);
router.get('/assignments/:id', authMiddleware, hasPermission('read:designaciones'), getAssignmentByIdController);
router.patch('/assignments/:id', authMiddleware, hasPermission('update:designaciones'), assignmentValidations, editAssignmentController);
router.delete('/assignments/:id', authMiddleware, hasPermission('delete:designaciones'), deleteAssignmentController);

export default router;