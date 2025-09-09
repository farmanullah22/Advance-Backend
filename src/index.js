//require('dotenv').config({path: './env'});   // This is to load the .env file variables into process.env

import dotenv from "dotenv";
import ConnectDB from "./db/index.js";

dotenv.config(
    {
        path: './env'
    }
);   // This is to load the .env file variables into process.env


ConnectDB();



// This is the Basic Setup of Express Server with MongoDB Connection
/*
import express from "express";
const app = express(); 

 ( async () => {
    try {
       await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`);
       
       app.on("error", (error) => {
        console.log("Error: ", error);

        throw error;

       });
       
        app.listen(process.env.PORT, () => {
        console.log(`Server is running at ${process.env.PORT}`);
    });

    }

    catch (error) {
        console.log("Error: ", error);
    }
    throw error;
 })

 */
