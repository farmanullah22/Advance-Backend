import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,  // Cloudinary public_id we can use to fetch the image
        required: true,
    },
    coverImage: {
        type: String,  // Cloudinary public_id we can use to fetch the image
        required: true,
    },
    watchHistory: [
        { 
        type: Schema.mongoose.Types.ObjectId,
        ref: "Video",
        default: null,
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
        default: null,
    },
}, { timestamps: true });

/* This code snippet is a pre-save hook in Mongoose that is executed before saving a user document to
the database. Specifically, it is hashing the user's password using bcrypt before saving it. */
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

     this.password = await bcrypt.hash(this.password, 10);
    next();
})


userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
}

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            _email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
        }
    )
}

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
     return jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
        }
    )

}

export const User = mongoose.model("User", userSchema);