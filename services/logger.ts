import { createLogger, transports, format } from "winston";
import "winston-mongodb";
import dotenv from "dotenv";
dotenv.config();

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
    format((info) => {
      info.additionalField = info.additionalField || null;
      return info;
    })()
  ),
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: 'info',
      db: process.env.MONGO_URL as string,
      options: { useUnifiedTopology: true }
    })
  ]
});

export default logger;
