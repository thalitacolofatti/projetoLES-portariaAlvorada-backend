import express from 'express';
import { register, login, refresh, logout } from '../controllers/auth.js';
import { checkRefreshToken } from '../midldleware/refreshTokenValidation.js'
import { checkToken } from '../midldleware/tokenValidation.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', checkToken, logout);
router.get('/refresh', checkRefreshToken, refresh);

export default router;