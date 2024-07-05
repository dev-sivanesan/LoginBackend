import express from 'express';
import db from './config/db';
import cors from 'cors';
import loginRoutes from './routes/loginRoute';
import { authenticateToken } from './middleware/auth';
import cookieParser from 'cookie-parser';
import imageRoutes from './routes/imageRoutes';
import router from './routes/index';
const app = express();

app.use(cors({
  origin: ['http://localhost:3000'],
  allowedHeaders: [
    'Origin', 'X-Requested-With',
    'Content-Type', 'Accept',
    'Authorization',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use('/',router);

app.get('/', authenticateToken, (req, res) => {
  res.json({ message: 'authenticated', status: true });
});

db.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    const PORT = 3001;
    app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
  })
  .catch(error => console.error('Error syncing database:', error));
