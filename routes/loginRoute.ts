import express from 'express';
import { loginController, logoutController } from '../controller/loginController';
import { ForgotPassword, resetPassword, verifyCode } from '../controller/forgetPassword';

const router = express.Router();

router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/forgotPassword', ForgotPassword);
router.post('/verifyCode/', verifyCode);
router.post('/resetPassword/:token', resetPassword);
export default router;

