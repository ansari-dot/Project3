import mongoose from "mongoose";

const sponsorshipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    programOfInterest: {
        type: String,
        required: true,
    },
    sponsorshipLevel: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Sponsorship = mongoose.model("Sponsorship", sponsorshipSchema);

export default Sponsorship;