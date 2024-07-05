import User from "../models/user";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { log } from "winston";
import logger from "./logger";
dotenv.config();
interface EmailResponse {
  message: string;
  status: boolean;
}

const forgetPasswordService = async (email: string):Promise<EmailResponse> => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { message: "User not found", status: false };
    } else {
      const token = crypto.randomInt(100000, 999999);
      await User.update({ token: token }, { where: { email } });
      const timeOut = () => {
        setTimeout(() => {
          User.update({ token: null }, { where: { email } });
        }, 1000 * 60 * 4);
      };

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: 'noReplay.nexi@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Reset your password using this token ${token} it will be valid for 5 minutes`,
      };

      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error) => {
          if (!error) {
            timeOut();
            resolve({ message: "email sent", status: true });
          } else {
            reject({ message: "error sending email", status: false });
          }
        });
      });
    }
  } catch (error:any) {
    return { message: error.message, status: false };
  }
};

const verifyCodeService = async (token: string) => {
  try {
    const user = await User.findOne({ where: { token } });
    if (!user) {
      return { message: "Invalid or expired code", status: false };
    }
    return { message: "Code verified", status: true };
  } catch (error:any) {
    return { message: error.message, status: false };
  }
};

const resetPasswordService = async (password: string, token: string) => {
  try {
    if (!password || !token) {
      return { message: "Invalid or expired code", status: false };
    }
    const dechiper=crypto.createDecipher('aes-256-cbc',process.env.SECRETE as string);
    const dechipertext=dechiper.update(token,'hex','utf8');
    const decrypt=dechipertext+dechiper.final('utf8');  
    const user = await User.findOne({ where: { token:decrypt } });
    if (!user) {
      return { message: "Invalid or expired code", status: false };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update({ password: hashedPassword, token: null }, { where: {token:decrypt } });
    logger.info(`${user.getDataValue("firstname")} ${user.getDataValue("lastname")} has reseted password`);
    return { message: "Password reset", status: true };
  } catch (error:any) {
    return { message: error.message, status: false };
  }
};

export { forgetPasswordService, verifyCodeService, resetPasswordService };
