import express from 'express';
import { createUserController, editUserController, getAllUsersController, deleteUserController, getUserByIdController } from '../controllers/usersController.mjs';
import userValidations from '../validations/userValidation.mjs';
import { authMiddleware } from '../middlewares/authMiddleware.mjs';
import { hasPermission } from '../middlewares/authorizationMiddleware.mjs';

const router = express.Router();

router.get('/users', authMiddleware, hasPermission('read:usuarios'), getAllUsersController);
router.post('/users', userValidations, hasPermission('create:usuarios'), createUserController);
router.get('/users/:id', hasPermission('read:usuarios'), authMiddleware, getUserByIdController);
router.patch('/users/:id', hasPermission('update:usuarios'), authMiddleware, userValidations, editUserController);
router.delete('/users/:id', hasPermission('delete:usuarios'), authMiddleware, deleteUserController);

export default router;