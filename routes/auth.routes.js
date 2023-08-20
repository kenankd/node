import express from 'express';
import { registerUser,loginUser,validate } from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/validate', validate);
export default router;
