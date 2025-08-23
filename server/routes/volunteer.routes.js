import express from "express";
import VolunteerController from "../Controller/volunteer.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// 🔹 Create a new volunteer (any logged-in user)
router.post("/volunteer/add", auth, VolunteerController.createVolunteer);

// 🔹 Get all volunteers (admin only)
router.get("/volunteer/get", auth, VolunteerController.getAllVolunteers);

// 🔹 Delete a volunteer by ID (admin only)
router.delete("/volunteer/delete/:id", auth, VolunteerController.deleteVolunteer);

export default router;