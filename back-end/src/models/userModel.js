import bcrypt from "bcrypt";
import database from "../database.js";
import { convertSnakeToCamel } from "../utils/formatters.js";
const BCRYPT_WORK_FACTOR = 10; //rounds of hashing user passwords
//provides methods that query database for checks as well as insertions
export default class Users {
  //method that inserts a user at registration into table
  static async register(credentials) {
    //user inputs
    const requiredFields = [
      "user_name",
      "email",
      "password",
      "first_name",
      "last_name",
    ];

    //iterate though provided inputs, if any is missing;throw error by indicating which one is missing
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw `Missing ${field} in request body`;
      }
    });

    //**email checks start**
    const lowercasedEmail = credentials.email.toLowerCase();
    //check for unacceptable format i.e., not first character of provided email
    if (credentials.email.indexOf("@") <= 0) {
      throw 'Invalid email';
    }

    //call method to get passed email to check if provided email already exists in DB
    const existingEmail = await Users.fetchUserByEmail(credentials.email);
    //if email was found, throw error
    if (existingEmail) {
      throw `Duplicate email: ${credentials.email}`;
    }

    //same logic with duplicate usernames
    // check if there's a user with the same user
    const existingUsername = await Users.fetchUserByUsername(
      credentials.user_name
    );

    //if found in db, throw error
    if (existingUsername) {
      throw `Duplicate username: ${credentials.user_name}`;
    }
    //PASSWORD HASHING
    const salt = await bcrypt.genSalt(BCRYPT_WORK_FACTOR);

    // // use salt to hash our pasword
    const hashedPassword = await bcrypt.hash(credentials.password, salt);

    //user query to post data into the database
    const userQuery = `
                INSERT INTO users (user_name, first_name, last_name, email, password)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
                `;
    //values we will assign, up to this point all checks were passed so can use credentials parameter
    const values = [
      credentials.user_name,
      credentials.first_name,
      credentials.last_name,
      lowercasedEmail,
      hashedPassword,
    ];
    //posting to the db
    const result = await database.query(userQuery, values);

    //get the user from the query
    const user = result.rows[0];

    //return the user
    return convertSnakeToCamel(user);
  }

  //method to be used at login
  static async login(credentials) {
    //decalre array of key mames to check object being passed from the frontend has these key values
    const requiredFields = ["email", "password"];
    //iterate trhough recieved objcet checking for the keys, through error if one is misiing
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw `Missing ${field} in request body`;
      }
    });

    //check if the email entered by the user exists in the DB
    let user = await Users.fetchUserByEmail(credentials.email);
    //using the email of the user compare the passed objcet password and the found user email's password in the database
    if (user) {
      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        user.password
      );

      if (isPasswordValid) {
        //if all checks are passed;terminates after returning the user
        return convertSnakeToCamel(user);
      }
    }
    //if a check fails. throw an error since the user with provided credential wss not found
    throw "Could not login due to invalid password/email.";
  }
  //methods that query databse below:
  // fetch an existing user based on an email
  static async fetchUserByEmail(email) {
    //throw an error if there is no email
    if (!email) {
      throw 'No email provided';
    }
    //select from the table the user where the email matches the input
    const query = `SELECT * FROM users WHERE email = $1`;
    //actual query
    const result = await database.query(query, [email.toLowerCase()]);

    const user = result.rows[0];
    //return user with matched email
    return convertSnakeToCamel(user);
  }

  //fetch an existing user based on username
  static async fetchUserByUsername(username) {
    //throw an error if no username is provided
    if (!username) {
      throw 'No username provided';
    }

    //select from the users table the the user that matches the username
    const query = `SELECT * FROM users WHERE user_name = $1`;

    //perform query
    const result = await database.query(query, [username.toLowerCase()]);
    //returns full row containing password,email, etc based on where the username match was found
    const user = result.rows[0];

    return convertSnakeToCamel(user);
  }
}
