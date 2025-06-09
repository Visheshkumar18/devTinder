const express = require("express");
const { auth } = require("../middleware/auth");
const User = require("../models/user");

const profileRouter = express.Router();

// Corrected: validation function for allowed updates
const isValidUpdate = (body) => {
    const allowedUpdates = ["firstName", "lastName", "skills", "About"];
    return Object.keys(body).every((key) => allowedUpdates.includes(key));
};

// GET - View profile
profileRouter.get("/profile/view", auth, async (req, res) => {
    try {
        res.json({ message: "Logged in user", user: req.user });
    } catch (err) { 
        res.status(500).send("ERROR: " + err.message);
    }
});

// PATCH - Edit profile
profileRouter.patch("/profile/edit", auth, async (req, res) => {
    try {
        if (!isValidUpdate(req.body)) {
            throw new Error("Invalid edit request");
        }

        const updates = req.body;
        const user = req.user;

        if (!user) {
            return res.status(404).send("User not found");
        }

        Object.keys(updates).forEach((key) => {
            user[key] = updates[key];
        });

        await user.save();
        res.json({ message: "Profile updated successfully", user });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter;
