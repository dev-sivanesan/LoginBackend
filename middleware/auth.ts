import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { Request, Response, NextFunction } from 'express';
dotenv.config();
const secretkey = process.env.SECRETE as string;
const authenticateToken = (req: any, res: Response, next: NextFunction) => {
    const accesstoken = req.cookies.accessToken

    try {
        if (!accesstoken) {
            return res.status(403).json({ message: 'No token provided', status: false });
        }
        jwt.verify(accesstoken, secretkey, (err: any, decoded: any) => {
            if (err) return res.status(403).json({err });
            req.user = decoded;
        })
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token', status: false });
    }
};



export { authenticateToken};
