import database from "../database.js";
import { convertSnakeToCamel } from "../utils/formatters.js";

export default class Post {
    //expects the s3 image upload key and user info to match the insertion into database
    static async lostPetPost(imageKey, credentials){
        //only necessary expected fields
        const requiredFields = [
            "user_name",
            "pet_name",
            "location"
        ]

        //ensure we have the key; else throw error and stop
        if (!imageKey) {
            throw `Image key was not provided`;
        }

        //check not empty:
        requiredFields.forEach((field) => {
        if (!credentials.hasOwnProperty(field)) {
            throw `Missing ${field} in request body`;
        }
        });

        //plainly insert into database using the username since a lost pet and a user are linked by username
        const query =
        `INSERT INTO lost_pet(user_name, pet_name, location, image_url)
        VALUES($1,$2,$3,$4)
        RETURNING *
        `;

        const values = [
            credentials.user_name,
            credentials.pet_name,
            credentials.location,
            imageKey
        ]

    const result = await database.query(query, values);
    //return successful insertion with provided information
    return convertSnakeToCamel(result.rows[0]);  
    }

}