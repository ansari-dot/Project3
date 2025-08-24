import express from "express";
import SponsorshipController from "../Controller/sponsorship.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Create sponsorship (public - no auth required)
router.post("/sponsorship/add", SponsorshipController.createSponsorship);

//  Get all sponsorships (admin only)
router.get("/sponsorship/get", auth, SponsorshipController.getAllSponsorships);

// Delete sponsorship (admin only)
router.delete("/sponsorship/delete/:id", auth, SponsorshipController.deleteSponsorship);

export default router;