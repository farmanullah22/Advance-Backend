import { response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const registerUser = asyncHandler(async (req, res) => {
     // get user detail from fronted
     // Validation of user data  here we can check not empty and valid email
     // chek user already registered with us,  Username, email 
     // Check the files means Avatar
     // Upload the file to cloudinary, Check the avatar is present or not
     // Now create user Object and save to database
     // Remove Password and Refresh token field from Response
     // Check for user creation or not
     // Return response to frontend

     const {fullName, email, password} = req.body;
     console.log(fullName, email, password);

       if(
        [fullName, email,username, password].some((field) => field.trim() === "")
       ){
        throw new ApiError(400, "All fields are required");
       }

      const existedUser =  User.findOne({
        $or: [{email}, {username}]
       })

       if(existedUser){
        throw new ApiError(409, "User already exists with this email or username");
         }

         const avatarLocalPath = req.files.avatar[0]?.path
        const coverImageLocalPath =  req.files.coverImage[0]?.path

        if(!avatarLocalPath || !coverImageLocalPath){
            throw new ApiError(400, "Avatar and Cover image are required");
        }

       const avatar =  await uploadOnCloudinary(avatarLocalPath);
       const coverImage =  await uploadOnCloudinary(coverImageLocalPath);

        if(!avatar){
            throw new ApiError(400, "Error uploading files to Cloudinary");
        }
        if(!coverImage){
            throw new ApiError(400, "Error uploading files to Cloudinary");
        }

        const user = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()

        })

       const createdUser =  await User.findById(user._id).select(
        "-password -refreshToken"    // Exclude these fields from response
       )
         if(!createdUser){
            throw new ApiError(400, "Something went wrong user are not created ");
         }

         return res.status(201).json(new ApiResponce(201, createdUser, "User created successfully"));

    })


export { registerUser }