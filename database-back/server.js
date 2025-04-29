const express = require('express');
const cors = require('Cors');
const pool = require('./database');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('backend connected to database');
});

app.post('/api/users', async (req, res) => {
    const {user_name, email, password} = req.body;

    try {
        const result = await pool.query (
            INSERT INTO users VALUES
            ('andres_c17', 'andres', 'canizales', 'ancaniz@gmail.com', 'apples'),
            ('stefania_c15', 'stefania', 'canizales', 'stefcaniz@gmail.com', 'oranges');
        );
        res.json(result.rows[0]);
    } 
    catch (err) {
        console.error(err);
        res.status(500).send('Error signing up');
    }
});

app.post('/api/lost_pet', async (req, res) => {
    const {user_name, pet_name, location, image_url} = req.body;

    try {
        const result = await pool.query (
            INSERT INTO lost_pet (user_name, pet_name, location, image_url)
            VALUES (?, ?, ?, ?) RETURNING *,
            [user_name, pet_name, location, image_url]
        );
        res.json(result.rows[0]);
    } 
    catch (err) {
        console.error(err);
        res.status(500).send('Error adding lost pet');
    }
});

app.post('/api/pet_sight', async (req, res) => {
    const {post_id, location, image_url} = req.body;

    try {
        const result = await pool.query (
            INSERT INTO lost_pet (post_id, location, image_url)
            VALUES (?, ?, ?) RETURNING *,
            [post_id, location, image_url]
        );
        res.json(result.rows[0]);
    } 
    catch (err) {
        console.error(err);
        res.status(500).send('Error adding pet sighting');
    }
});

app.listen(3000)