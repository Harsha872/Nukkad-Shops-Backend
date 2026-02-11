import { createLead } from "../models/lead.js";
import { sendToHubSpot } from "../services/hubSpot.js";

export const submitBrochureLead = async (req, res) => {
    try {
        const { name, mobile, email, city, source } = req.body;

        if (!name || !mobile || !email || !city) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 1️⃣ Save to MySQL
        await createLead({ name, mobile, email, city, source });

        // 2️⃣ Send to HubSpot (non-blocking - don't fail the request if HubSpot fails)
        try {
            await sendToHubSpot({ name, mobile, email, city });
            console.log('✅ Lead successfully sent to HubSpot');
        } catch (hubspotError) {
            console.error('❌ Failed to send lead to HubSpot:', hubspotError.message);
            // Don't fail the request - just log the error
            // You can implement retry logic or queue here if needed
        }

        res.status(201).json({
            success: true,
            message: "Lead saved successfully",
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: "Server error" });
    }
};
