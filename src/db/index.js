import mongoose from "mongoose";
import { DB_Name } from "../constants.js";


const ConnectDB = async () => {
    try {
     const connectionInstance =    await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`);
        console.log(`MongoDB Connected || DB Host: ${connectionInstance.connection.host}`);


        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("MongoDB Connection Failed: ", error);
        process.exit(1);
    }
};
export default ConnectDB;