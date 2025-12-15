import express from 'express';
import {
  createUserController,
  editUserController,
  getAllUsersController,
  deleteUserController,
  getUserByIdController
} from '../controllers/usersController.mjs';

import userValidations from '../validations/userValidation.mjs';
import { authMiddleware } from '../middlewares/authMiddleware.mjs';
import { hasPermission } from '../middlewares/authorizationMiddleware.mjs';

const router = express.Router();

router.get(
  '/users',
  authMiddleware,
  hasPermission('read:usuarios'),
  getAllUsersController
);

router.post(
  '/users',
  authMiddleware,
  hasPermission('create:usuarios'),
  userValidations,
  createUserController
);

router.get(
  '/users/:id',
  authMiddleware,
  hasPermission('read:usuarios'),
  getUserByIdController
);

router.patch(
  '/users/:id',
  authMiddleware,
  hasPermission('update:usuarios'),
  userValidations,
  editUserController
);

router.delete(
  '/users/:id',
  authMiddleware,
  hasPermission('delete:usuarios'),
  deleteUserController
);

export default router;
