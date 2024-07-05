import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();
const secretkey = process.env.SECRETE as string;
const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.json({ message: "User not found", status: false });
        }

        const match = await bcrypt.compare(password, user.getDataValue('password'));
        if (!match) {
            return res.json({ message: "incorrect password", status: false });

        }
        const accessToken = jwt.sign({ id: user.getDataValue("id"), role: user.getDataValue("role") }, secretkey, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ id: user.getDataValue("id"), role: user.getDataValue("role") }, secretkey, { expiresIn: "1d" });
        res
            .cookie('accessToken', accessToken, { domain: 'localhost', maxAge: 1000 * 60 * 60 * 1, httpOnly: true, secure: true, path: '/' })
            .json({ message: "Login Sucessful", status: true, role: user.getDataValue("role") });


    } catch (error: any) {
        res.status(500).json({ message: error.message, stats: false });
    }

}
const logoutController = async (req: Request, res: Response) => {
    res.clearCookie('accessToken', { domain: 'localhost', path: '/' });
    res.json({ message: "Logout successful", status: true });
}
const createUserController= async()=>{
    
}
export { loginController, logoutController };  
