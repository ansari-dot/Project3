import mongoose from "mongoose";

const partnershipSchema = new mongoose.Schema({
    organizationName: { type: String, required: true },
    organizationType: { type: String, required: true },
    contactPerson: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    partnershipType: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

const Partnership = mongoose.model("Partnership", partnershipSchema);

export default Partnership;