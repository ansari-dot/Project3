import mongoose from 'mongoose';
//const uri = 'mongodb+srv://073ansari:ansari@guesthouse.gyhavro.mongodb.net/'
const uri = "mongodb://localhost:27017/sk"
const connectDB = async() => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;