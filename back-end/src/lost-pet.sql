
/* USERS table for all users who are using the platform (either owners of missing pets, 
 * or users trying to help finding missing pets)
 password was updated so that we can store hashed passwords
 */
CREATE TABLE users (
	user_name VARCHAR(50) PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL 
);

/* LOST_PET table where users can post their missing pet. user_id is used as foreign key 
 * from USERS table so there's a relationship between the post and the owner. 
 * The status attribute is essential in order to prevent the data to grow infinitely
 */
CREATE TABLE lost_pet (
    post_id SERIAL PRIMARY KEY,
    user_name VARCHAR NOT NULL,
    pet_name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(10) CHECK(status IN ('not found', 'found')) DEFAULT 'not found',
    image_url TEXT,
    FOREIGN KEY (user_name) REFERENCES users(user_name) ON DELETE CASCADE
);

/* PET_SIGHT table is where users who saw a potential match to missing pet posts can post 
 * the pet they saw. post_id is a foreign key here since it has to be connected to the 
 * missing pet posts and also to inform the user who lost his pet that there's a 
 * possibility of finding the pet
 */
CREATE TABLE pet_sight (
    sight_id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url TEXT,
    FOREIGN KEY (post_id) REFERENCES lost_pet(post_id) ON DELETE CASCADE
);

ALTER TABLE lost_pet
<<<<<<< HEAD
ADD COLUMN latitude DOUBLE PRECISION,
ADD COLUMN longitude DOUBLE PRECISION;

ALTER TABLE pet_sight
ADD COLUMN latitude DOUBLE PRECISION,
ADD COLUMN longitude DOUBLE PRECISION;

=======
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS breed VARCHAR(50);

ALTER TABLE pet_sight
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS breed VARCHAR(50);
>>>>>>> be0fb599414ca4417a05233cdf08b15e026fac04
