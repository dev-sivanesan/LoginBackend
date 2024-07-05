import express from "express";
import { getImage } from "../controller/imageController";

const router = express.Router();

router.get('/getImage', getImage);
export default router;