import express from 'express';
import {registerController,
    loginController,
    verifyPinController,
    changePassController,
    getSecurityDataController
    } from '../controllers/auth-controller.js';

const router = express.Router();

//user registration
router.post('/register', registerController);
//user login
router.post('/login', loginController);
//pin
router.post('/verify-pin', verifyPinController);
//get security page data
router.get('/getSecuritydata', getSecurityDataController);
//change password
router.put('/changePass', changePassController);

export default router;