import express from 'express';
import { getAluno } from  '../controllers/students.js';
import { checkToken } from '../midldleware/tokenValidation.js'

const router = express.Router();

router.get('/', checkToken, getAluno);

export default router;