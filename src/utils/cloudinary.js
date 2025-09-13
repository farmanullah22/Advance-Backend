/* This code snippet is importing the `v2` module from the `cloudinary` library and assigning it an
alias `cloudinary`. It is also importing the `fs` module from Node.js to handle file operations. */


import { v2 as cloudinary } from "cloudinary"; // we also remain v2 but cloudinary as just a name that i'll use
import fs from "fs";    // file system module to handle file operations


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // Upload the file on Cloudinary
       const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto", // this will automatically detect the file type (image, video, etc.)
        })
        // file has been uploaded successfully
        console.log("File uploaded on Cloudinary successfully", response.url);
        return response;
    }
    catch (error) {
        fs.unlinkSync(localFilePath); // remove the file from local Saved temprory file as the upload operation folder
    }
}

export default uploadOnCloudinary;
