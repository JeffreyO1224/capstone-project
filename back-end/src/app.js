import express from "express"; // import express
const app = express(); // create our app
app.use(express.json());//allows us to use json

//import routes to interact with database

//use our routes by attaching with app

export default app;//allows to export our app