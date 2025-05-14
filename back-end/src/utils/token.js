import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

//generate our JWT token and make it last 24hrs (user stays logged in for 24hr)
const generateToken = (data) => {
  return jwt.sign(data, SECRET_KEY, { 
    algorithm: "HS256", 
    expiresIn: "24h"
  });
};

const createUserJwt = (user) => {
  const payload = {
    email: user.email,
    username: user.user_name 
  };
  return generateToken(payload);
};

//validates user token
const validateToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid/Expired token");
  }
};

export { generateToken, createUserJwt, validateToken };