import database from "../database.js";
import { convertSnakeToCamel } from "../utils/formatters.js";

export default class Post {
    //expects the s3 image upload key and user info to match the insertion into database
    static async createPetPost(imageKey, credentials){
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
            if (!(field in credentials)) {
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

    //method to retrieve all pet posts from the table
    static async retrieveAllPets() {
        //define query ensuring that the status is 'not found' which will be passed later
        const petQuery = 
        `SELECT * from lost_pet WHERE status = $1`;
        const status = 'not found';
        //send the status to only retrieve pets that were not found 
        const result = await database.query(petQuery,[status]);
        //return all the found pets. including the postid
        return convertSnakeToCamel(result.rows);
    }

    //retrieves the pets by id- to be used when clicking on individual post
    static async getPostByID(postID){
        if(!postID){
            throw 'No post ID provided'
        }
        //check if it exists in the db, first define query
        const findIDQuery = 'SELECT * FROM lost_pet WHERE post_id = $1';
        //look for a match and return it
        const result = await database.query(findIDQuery,[postID])
        //if not match found becasuse result had nothing doesn't exist
        if (result.rows.length === 0) {
            throw `Post with ID ${postID} does not exist`;
        }
        //holds result; no need for further checking
        return convertSnakeToCamel(result.rows[0])
    }

    //method to delete a pet posting, for any reason or when a pet is found
    static async deletePetPost(){
        console.log("ask question")
    }

}