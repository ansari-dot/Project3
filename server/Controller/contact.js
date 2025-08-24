import Contact from "../model/Contact.js";
import User from "../model/User.js";

class ContactController {

    // Create Contact
    static async createContact(req, res) {
        try {
            const { firstName, lastName, email, phone, subject, message } = req.body;

            // Validate required fields
            if (!firstName || !lastName || !email || !subject || !message) {
                return res.status(400).json({
                    message: "Please fill all required fields",
                    success: false
                });
            }

            const newContact = new Contact({
                firstName,
                lastName,
                email,
                phone,
                subject,
                message
            });

            await newContact.save();

            res.status(201).json({
                message: "Contact form submitted successfully",
                success: true,
                data: newContact
            });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // Get All Contacts (Admin only)
    static async getContacts(req, res) {
        try {
            const { exists, isAdmin } = await ContactController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can view all contacts" });
            }

            const contacts = await Contact.find();
            res.json({ success: true, data: contacts });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // Helper: check if user exists and is admin
    static async checkAdmin(userId) {
        const user = await User.findById(userId);
        if (!user) return { exists: false, isAdmin: false };
        return { exists: true, isAdmin: user.role === "admin" };
    }

    // Delete Contact (Admin only)
    static async deleteContact(req, res) {
        try {
            const { exists, isAdmin } = await ContactController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can delete contacts" });
            }

            const deleted = await Contact.findByIdAndDelete(req.params.id);

            if (!deleted) {
                return res.status(404).json({ message: "Contact not found" });
            }

            res.json({ message: "Contact deleted successfully", success: true });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }
}

export default ContactController;