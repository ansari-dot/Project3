import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "sk";

class UserController {

    // Register user
    static async register(req, res) {
        try {
            const { username, email, password, role } = req.body;

            // check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }

            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // create user
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role: role || "user" // default is user
            });

            await newUser.save();

            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Login user
    static async login(req, res) {
            try {
                const { email, password } = req.body;

                // find user
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }

                // check password
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }

                // create token
                const token = jwt.sign({ id: user._id, role: user.role },
                    JWT_SECRET, { expiresIn: "1d" }
                );

                // store token in cookie
                res.cookie("token", token, {
                    httpOnly: true, // prevents JS access
                    secure: false, // set true if using HTTPS
                    maxAge: 24 * 60 * 60 * 1000 // 1 day
                });

                res.json({ message: "Login successful", token });
            } catch (error) {
                res.status(500).json({ message: "Server error", error: error.message });
            }
        }
        // logout User
    static async logout(req, res) {
        try {
            res.clearCookie("token");
            res.json({ message: "Logged out successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

export default UserController;