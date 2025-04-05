import express from "express"; // import express
const app = express(); // create our app
app.use(express.json());//allows us to use json

//import routes to interact with database
import predictionRoute from './routes/predictionRoute.js'; //import defined route for prediction 
//use our routes by attaching with app
app.use('/predict', predictionRoute)

export default app; //allows to export our app