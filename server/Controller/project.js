import Project from "../model/Project.js";
import User from "../model/User.js";

class ProjectController {
    // Get all projects (Admin & User)
    static async getProjects(req, res) {
        try {
            const projects = await Project.find();
            return res.status(200).json({ success: true, projects });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching projects",
                error: error.message
            });
        }
    }

    //  Add a new project (Admin only)
    static async addProject(req, res) {
        try {
            const userId = req.user.id; // from auth middleware
            const user = await User.findById(userId);

            if (!user || user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Only admin can add projects"
                });
            }

            let { title, description, location, status, startDate, endDate, impact } = req.body;

            //  Ensure image uploaded
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Image is required"
                });
            }

            const newProject = new Project({
                title,
                description,
                location,
                status,
                startDate,
                endDate,
                impact, // { familiesAssisted, otherImpact }
                image: req.file.filename // save only filename
            });

            await newProject.save();

            return res.status(201).json({ success: true, project: newProject });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error adding project",
                error: error.message
            });
        }
    }

    //  Delete project (Admin only)
    static async deleteProject(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);

            if (!user || user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Only admin can delete projects"
                });
            }

            const projectId = req.params.id;
            const deletedProject = await Project.findByIdAndDelete(projectId);

            if (!deletedProject) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Project deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error deleting project",
                error: error.message
            });
        }
    }
}

export default ProjectController;