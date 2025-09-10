//require('dotenv').config({path: './env'});   // This is to load the .env file variables into process.env

import dotenv from "dotenv";
import ConnectDB from "./db/index.js";
import app from "./app.js";

dotenv.config(
    {
        path: './env'
    }
);   // This is to load the .env file variables into process.env


ConnectDB()
.then(() => {
    app.listen(process.env.PORT  || 8000, () => {
        console.log(`Server is running at PORT: ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("MongoDB Connection is Failed: ", err);
})

app.on("error", (error) => {
    console.log("Error: ", error);
    throw error;
});

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
