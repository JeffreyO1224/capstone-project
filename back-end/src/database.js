import { config } from 'dotenv';
import { Pool } from 'pg';

//load our environment variables
config();

console.log("Loaded DB config:", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

const database = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
});

//use our sql scheme to create the tables in our aiven database
const schema = `
CREATE TABLE IF NOT EXISTS users (
    user_name VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL 
);

CREATE TABLE IF NOT EXISTS lost_pet (
    post_id SERIAL PRIMARY KEY,
    user_name VARCHAR NOT NULL,
    pet_name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(10) CHECK(status IN ('not found', 'found')) DEFAULT 'not found',
    image_url TEXT,
    FOREIGN KEY (user_name) REFERENCES users(user_name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pet_sight (
    sight_id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url TEXT,
    FOREIGN KEY (post_id) REFERENCES lost_pet(post_id) ON DELETE CASCADE
);

ALTER TABLE lost_pet
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS breed VARCHAR(50);

ALTER TABLE pet_sight
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS breed VARCHAR(50);
`;

//connect to the data explicitly and also ensure that we are connected to the database
//with logging to the console
//using a cloud db solution that is free
database.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Connection error', err.stack);
    }

    client.query(schema, (err) => {
        release(); // release the client
        if (err) {
            return console.error('❌ Error running schema', err.stack);
        }
        //ensure our aiven database creates the stables
        console.log('✅ Schema successfully created and DB connected.');
    });
})

export default database;