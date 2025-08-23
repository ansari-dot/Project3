import express from "express";
import ContactController from "../controller/contact.js";
import { auth } from "../middleware/auth.js"; // to protect routes

const router = express.Router();

// Public route to submit contact form
router.post("/contact/add", ContactController.createContact);

// Get all contacts (Admin) or only user’s own contacts
router.get("/contact/get", auth, ContactController.getContacts);

//  Get single contact by ID (only owner or admin)
router.get("/contact/get/:id", auth, ContactController.getContactById);


//  Delete contact (only owner or admin)
router.delete("/contact/delete/:id", auth, ContactController.deleteContact);

export default router;