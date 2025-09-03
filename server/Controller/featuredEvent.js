import FeaturedEvent from "../model/FeaturedEvent.js";
import User from "../model/User.js";

class FeaturedEventController {

    // Helper function: check if user exists and is admin
    static async checkAdmin(userId) {
        const user = await User.findById(userId);
        if (!user) return { exists: false, isAdmin: false };
        return { exists: true, isAdmin: user.role === "admin" };
    }

    // Create Featured Event (Admin only)
    static async createFeaturedEvent(req, res) {
        try {
            const { exists, isAdmin } = await FeaturedEventController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can add featured events" });
            }

            const { title, description, date, time, location, highlights, stats, registrationLink, imageUrls } = req.body;
            
            // Handle uploaded images or image URLs
            let images = ['/placeholder-logo.png'];
            if (req.files && req.files.length > 0) {
                images = req.files.map(file => `/uploads/${file.filename}`);
            } else if (imageUrls) {
                try {
                    const urls = JSON.parse(imageUrls);
                    images = Array.isArray(urls) && urls.length > 0 ? urls : ['/placeholder-logo.png'];
                } catch (e) {
                    images = ['/placeholder-logo.png'];
                }
            }

            const newFeaturedEvent = new FeaturedEvent({
                title,
                description,
                date,
                time,
                location,
                images,
                highlights: highlights ? JSON.parse(highlights) : [],
                stats: stats ? JSON.parse(stats) : {
                    speakers: 0,
                    attendees: 0,
                    workshops: 0,
                    days: 1
                },
                registrationLink: registrationLink || '#'
            });

            await newFeaturedEvent.save();

            res.status(201).json({ 
                success: true, 
                message: "Featured event created successfully", 
                data: newFeaturedEvent 
            });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // Get Latest Active Featured Event (Public)
    static async getLatestFeaturedEvent(req, res) {
        try {
            const featuredEvent = await FeaturedEvent.findOne({ isActive: true })
                .sort({ date: 1, createdAt: -1 })
                .limit(1);
            
            if (!featuredEvent) {
                return res.json({ 
                    success: true, 
                    data: null,
                    message: "No active featured events found" 
                });
            }

            res.json({ success: true, data: featuredEvent });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // Get All Featured Events (Admin only)
    static async getAllFeaturedEvents(req, res) {
        try {
            const { exists, isAdmin } = await FeaturedEventController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can view all featured events" });
            }

            const featuredEvents = await FeaturedEvent.find().sort({ date: 1, createdAt: -1 });
            res.json({ success: true, data: featuredEvents });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // Get Single Featured Event by ID (Admin only)
    static async getFeaturedEventById(req, res) {
        try {
            const { exists, isAdmin } = await FeaturedEventController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can view featured event details" });
            }

            const featuredEvent = await FeaturedEvent.findById(req.params.id);
            if (!featuredEvent) {
                return res.status(404).json({ message: "Featured event not found" });
            }
            res.json({ success: true, data: featuredEvent });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // Update Featured Event (Admin only)
    static async updateFeaturedEvent(req, res) {
        try {
            const { exists, isAdmin } = await FeaturedEventController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can update featured events" });
            }

            const { title, description, date, time, location, highlights, stats, registrationLink, imageUrls } = req.body;
            
            // Build update object
            const updateData = {
                title,
                description,
                date,
                time,
                location,
                highlights: highlights ? JSON.parse(highlights) : [],
                stats: stats ? JSON.parse(stats) : {
                    speakers: 0,
                    attendees: 0,
                    workshops: 0,
                    days: 1
                },
                registrationLink: registrationLink || '#'
            };

            // Handle uploaded images or image URLs
            if (req.files && req.files.length > 0) {
                updateData.images = req.files.map(file => `/uploads/${file.filename}`);
            } else if (imageUrls) {
                try {
                    const urls = JSON.parse(imageUrls);
                    updateData.images = Array.isArray(urls) && urls.length > 0 ? urls : ['/placeholder-logo.png'];
                } catch (e) {
                    updateData.images = ['/placeholder-logo.png'];
                }
            }

            const updatedFeaturedEvent = await FeaturedEvent.findByIdAndUpdate(
                req.params.id,
                updateData, 
                { new: true }
            );

            if (!updatedFeaturedEvent) {
                return res.status(404).json({ message: "Featured event not found" });
            }

            res.json({ 
                success: true, 
                message: "Featured event updated successfully", 
                data: updatedFeaturedEvent 
            });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // Delete Featured Event (Admin only)
    static async deleteFeaturedEvent(req, res) {
        try {
            const { exists, isAdmin } = await FeaturedEventController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can delete featured events" });
            }

            const deletedFeaturedEvent = await FeaturedEvent.findByIdAndDelete(req.params.id);

            if (!deletedFeaturedEvent) {
                return res.status(404).json({ message: "Featured event not found" });
            }

            res.json({ 
                success: true, 
                message: "Featured event deleted successfully" 
            });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }
}

export default FeaturedEventController;
