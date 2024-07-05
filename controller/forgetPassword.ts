import { Request, Response } from 'express';
import { forgetPasswordService, resetPasswordService, verifyCodeService } from '../../services/passwordServices';
import logger from '../../services/logger';
const ForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const message= await forgetPasswordService(email);
    return res.json({ message:message?.message , status:message?.status });
  } catch (error) {
    return res.json({ message: "error sending email", status: false });
  }
}

const verifyCode = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const message = await verifyCodeService(token);
    return res.json({ message: message?.message, status: message?.status });
  } catch (error) {
    return res.json({ message: "error in verifyCode", status: false });
  }
}
const resetPassword = async (req: Request, res: Response) => {
  try {
    const {password} = req.body;
    const token = req.params.token;

    const message = await resetPasswordService(password, token);
    return res.json({ message: message?.message, status: message?.status });
  } catch (error) {
    return res.json({ message: "error in resetPassword", status: false });
  }
}

export { ForgotPassword, verifyCode, resetPassword };