import express from "express";
import ProgramController from "../Controller/program.js";
import { auth } from "../middleware/auth.js";
import upload from '../util/multer.js'
const router = express.Router();

//Get all programs (accessible by  users & admins)
router.get("/program/get", auth, upload.single('image'), ProgramController.getPrograms);

//  Add program (Admin only)
router.post("/program/add", auth, ProgramController.addProgram);

//  Delete program (Admin only)
router.delete("/program/delete/:id", auth, ProgramController.deleteProgram);

export default router;