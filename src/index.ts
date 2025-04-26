import 'dotenv/config';

import { openConnection } from './database/mongodb';

async function startApp() {

    try {
        await openConnection();

        require('./Router');

    } catch(error) {
        console.error("Failed to start application:", error);
        process.exit(1);
    }

};

startApp();