import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export const config = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE,
    databaseUrl: process.env.DATABASE_URL,
};

// Initialize the pool (PostgreSQL connection)
export const pool = new Pool({
    connectionString: config.databaseUrl,
});