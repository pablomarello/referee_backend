import express from 'express';
import { createUserController, editUserController, getAllUsersController, deleteUserController, getUserByIdController } from '../controllers/usersController.mjs';
import userValidations from '../validations/userValidation.mjs';

const router = express.Router();

router.get('/users', getAllUsersController);
router.post('/users', userValidations, createUserController);
router.get('/users/:id', getUserByIdController);
router.patch('/users/:id', userValidations, editUserController);
router.delete('/users/:id', deleteUserController);

export default router;