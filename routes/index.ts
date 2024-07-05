import loginRoutes from "./loginRoute";
import imageRoutes from "./imageRoutes";
import express  from "express";

const router = express.Router();

router.use('/login',loginRoutes);
router.use('/image',imageRoutes);

export default router;