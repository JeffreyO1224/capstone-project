import { config } from 'dotenv';
import { Pool } from 'pg';

// Load environment variables from .env
config();

const database = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

export default database;