import Volunteer from "../model/Volunteer.js";
import User from "../model/User.js";

class VolunteerController {

    // Helper: check if user exists and is admin
    static async checkAdmin(userId) {
        const user = await User.findById(userId);
        if (!user) return { exists: false, isAdmin: false };
        return { exists: true, isAdmin: user.role === "admin" };
    }

    //  Create Volunteer (any logged-in user)
    static async createVolunteer(req, res) {
        try {
            const { firstName, lastName, email, phone, areasOfInterest, availability, timeCommitment, whyJoin } = req.body;

            const newVolunteer = new Volunteer({
                firstName,
                lastName,
                email,
                phone,
                areasOfInterest,
                availability,
                timeCommitment,
                whyJoin
            });

            await newVolunteer.save();

            res.status(201).json({ success: true, message: "Volunteer registered successfully", data: newVolunteer });
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    }

    //  Get All Volunteers (Admin only)
    static async getAllVolunteers(req, res) {
        try {
            const { exists, isAdmin } = await VolunteerController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can view all volunteers" });
            }

            const volunteers = await Volunteer.find();
            res.json({ success: true, data: volunteers });
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    }

    // Delete Volunteer (Admin only)
    static async deleteVolunteer(req, res) {
        try {
            const { exists, isAdmin } = await VolunteerController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can delete a volunteer" });
            }

            const deleted = await Volunteer.findByIdAndDelete(req.params.id);

            if (!deleted) {
                return res.status(404).json({ message: "Volunteer not found" });
            }

            res.json({ success: true, message: "Volunteer deleted successfully" });
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    }
}

export default VolunteerController;