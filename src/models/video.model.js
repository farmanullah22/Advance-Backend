import { Mongoose, Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new mangoose.Schema({

    videoFile: {
        type: String,  // Cloudinary public_id we can use to fetch the video
        required: true,
    },
    thumbnail: {
        type: String,  // Cloudinary public_id we can use to fetch the image
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,   // Cloudinary url will give us the duration in seconds
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    asPublished: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }

}, { timestamps: true });


videoSchema.plugin(mongooseAggregatePaginate);


export const Video = mongoose.model("Video", videoSchema);