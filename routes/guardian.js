import express from 'express';
import { createGuardian, getGuardian, updateGuardian, deleteGuardian } from  '../controllers/guardian.js';
import { checkToken } from '../midldleware/tokenValidation.js'

const router = express.Router();

router.post('/create-guardian', checkToken, createGuardian);
router.get('/get-guardian', checkToken, getGuardian);
router.put('/update-guardian', checkToken, updateGuardian);
router.put('/delete-guardian', checkToken, deleteGuardian);

export default router;