import express from 'express';
import { createPermissionController, getAllPermissionsController } from '../controllers/permissionsController.mjs';

const router = express.Router();

router.get('/permissions', getAllPermissionsController);
router.post('/permissions', createPermissionController);

export default router;