import { config } from 'dotenv';

config();

//load our secret key from our dotenv, which will be used to generate user tokens
export const SECRET_KEY = process.env.SECRET_KEY || "SOMETHING_SUPER_SECRET_GOES_HERE" ;