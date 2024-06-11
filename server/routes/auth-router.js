import express from 'express';
import {registerController,
    loginController,
    verifyPinController
    } from '../controllers/auth-controller.js';

const router = express.Router();

//user registration
router.post('/register', registerController);
//user login
router.post('/login', loginController);
//pin
router.post('/verify-pin', verifyPinController);

export default router;