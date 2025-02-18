/* USERS table for all users who are using the platform (either owners of missing pets, 
 * or users trying to help finding missing pets)
 */
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL
);

/* LOST_PET table where users can post their missing pet. user_id is used as foreign key 
 * from USERS table so there's a relationship between the post and the owner. 
 * The status attribute is essential in order to prevent the data to grow infinitely
 */
CREATE TABLE lost_pet (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    dog_name VARCHAR(100),
    location VARCHAR(255) NOT NULL,
    status TEXT CHECK(status IN ('not found', 'found')) DEFAULT 'not found',
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

/* PET_SIGHT table is where users who saw a potential match to missing pet posts can post 
 * the pet they saw. post_id is a foreign key here since it has to be connected to the 
 * missing pet posts and also to inform the user who lost his pet that there's a 
 * possibility of finding the pet
 */
CREATE TABLE pet_sight (
    sight_id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    location VARCHAR(255) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES lost_pet(post_id)
);