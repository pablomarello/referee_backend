import express from 'express';
import { createRoleController, getAllRolesController } from '../controllers/rolesController.mjs';

const router = express.Router();

router.get('/roles', getAllRolesController);
router.post('/roles', createRoleController);

export default router;