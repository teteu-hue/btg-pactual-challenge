import { createLogger, transports } from "winston";
import "winston-mongodb";
import 'dotenv/config';

const logger = createLogger({
    transports: [
        new transports.MongoDB({
            db: process.env.DB_CONN_STRING || 'mongodb://mongodb:27017',
            collection: 'logs',
            level: 'info',
            options: {
                useUnifiedTopology: true
            }

        })
    ]
});

export default logger;
