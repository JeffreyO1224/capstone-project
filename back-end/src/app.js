import express from "express"; // import express
import cors from "cors";
const app = express(); // create our app
app.use(express.json()); //allows us to use json
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["*"],
  })
);

//import routes to interact with database
import predictionRoute from "./routes/predictionRoute.js"; //import defined route for prediction
//use our routes by attaching with app
app.use("/predict", predictionRoute);

import usersRoute from "./routes/usersRoute.js"; //route for users
app.use('/users', usersRoute)

import s3Routes from "./routes/s3Routes.js"
app.use("/s3", s3Routes)

export default app; //allows to export our app
