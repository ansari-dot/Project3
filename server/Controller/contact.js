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
                    message: "Please fill all the fields",
                    success: false
                });
            }

            // Check if email already used in contact form
            const existingContact = await Contact.findOne({ email });
            if (existingContact) {
                return res.status(400).json({
                    message: "This email has already submitted a form",
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

    // Get All Contacts (Admin) or User's Own
    static async getContacts(req, res) {
        try {
            let contacts;
            if (req.user.role === "admin") {
                contacts = await Contact.find();
            } else {
                contacts = await Contact.find({ userId: req.user.id });
            }
            res.json({ success: true, data: contacts });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    //  Get Single Contact by ID
    static async getContactById(req, res) {
        try {
            const contact = await Contact.findById(req.params.id);
            if (!contact) {
                return res.status(404).json({ message: "Contact not found" });
            }

            // Check ownership or admin
            if (req.user.role !== "admin" && contact.userId.toString() !== req.user.id) {
                return res.status(403).json({ message: "Unauthorized" });
            }

            res.json({ success: true, data: contact });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }


    // Delete Contact
    static async deleteContact(req, res) {
        try {
            const contact = await Contact.findById(req.params.id);
            if (!contact) {
                return res.status(404).json({ message: "Contact not found" });
            }

            // Only admin or owner can delete
            if (req.user.role !== "admin" && contact.userId.toString() !== req.user.id) {
                return res.status(403).json({ message: "Unauthorized" });
            }

            await Contact.findByIdAndDelete(req.params.id);

            res.json({ message: "Contact deleted successfully", success: true });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }
}

export default ContactController;