import express from "express";
import PartnershipController from "../Controller/partnership.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Create partnership (any logged-in user)
router.post("/partnership/add", auth, PartnershipController.createPartnership);

//  Get all partnerships  for  admin only
router.get("/partnership/get", auth, PartnershipController.getAllPartnerships);

// Delete partnership (admin only)
router.delete("/partnership/delete/ :id", auth, PartnershipController.deletePartnership);

export default router;