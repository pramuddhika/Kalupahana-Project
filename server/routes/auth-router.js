import express from 'express';
import {registerController,
    loginController
    } from '../controllers/auth-controller.js';

const router = express.Router();

//user registration
router.post('/register', registerController);
//user login
router.post('/login', loginController);

export default router;