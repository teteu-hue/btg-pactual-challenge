import 'dotenv/config';
import mongoose from 'mongoose';

export async function openConnection() {
    const { DB_CONN_STRING } = process.env;

    if(!DB_CONN_STRING) {
        throw new Error("Please inform a DB_CONN_STRING in .env file!");
    }

    try {
        const options = {
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000
        }
        
        await mongoose.connect(DB_CONN_STRING, options);
        console.log("Connection has been established");
    } catch(e) {

        console.error("MongoDB Connection Error: " + 4);
        throw new Error("Connection is not established => " + e);
    }
}

export async function closeConnection() {
    try {
        await mongoose.disconnect();
        console.log("Connection closed!");
    } catch(error) {
        console.error("Error closing MongoDB connection: ", error);
    }
}
