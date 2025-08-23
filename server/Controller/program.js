import Program from "../model/Program.js";
import User from "../model/User.js";

class ProgramController {
    //  Get all programs (Admin & User)
    static async getPrograms(req, res) {
        try {
            const programs = await Program.find();
            return res.status(200).json({ success: true, programs });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching programs",
                error: error.message
            });
        }
    }

    //  Add a new program (Admin only)
    static async addProgram(req, res) {
        try {
            const userId = req.user.id; // from auth middleware
            const user = await User.findById(userId);

            if (!user || user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Only admin can add programs"
                });
            }

            let { name, description, keyFeatures, impact, sustainability } = req.body;

            //  Convert to array if sent as string
            if (typeof keyFeatures === "string") {
                keyFeatures = keyFeatures.split(",").map(item => item.trim());
            }
            if (typeof sustainability === "string") {
                sustainability = sustainability.split(",").map(item => item.trim());
            }

            //  Ensure image uploaded
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Image is required"
                });
            }

            const newProgram = new Program({
                name,
                description,
                keyFeatures,
                impact, // { beneficiaries, locations, responseTime }
                image: req.file.filename,
                sustainability
            });

            await newProgram.save();

            return res.status(201).json({ success: true, program: newProgram });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error adding program",
                error: error.message
            });
        }
    }

    //  Delete program (Admin only)
    static async deleteProgram(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);

            if (!user || user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Only admin can delete programs"
                });
            }

            const programId = req.params.id;
            const deletedProgram = await Program.findByIdAndDelete(programId);

            if (!deletedProgram) {
                return res.status(404).json({
                    success: false,
                    message: "Program not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Program deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error deleting program",
                error: error.message
            });
        }
    }
}

export default ProgramController;