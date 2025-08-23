import mongoose from "mongoose";


const mediaSchema = new mongoose.Schema({
    mediaType: {
        type: String, // here media type means that that the add thing  is an event,news pr blogs ok 
        required: true
    },
    heading: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    highlight: {
        type: [String],
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Media = mongoose.model("Media", mediaSchema);
export default Media;