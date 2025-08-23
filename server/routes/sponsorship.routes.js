import express from "express";
import SponsorshipController from "../Controller/sponsorship.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Create sponsorship (any logged-in user)
router.post("/sponsorship/add", auth, SponsorshipController.createSponsorship);

//  Get all sponsorships (admin only)
router.get("/sponsorship/get", auth, SponsorshipController.getAllSponsorships);

// Delete sponsorship (admin only)
router.delete("sponsorship/delete/:id", auth, SponsorshipController.deleteSponsorship);

export default router;