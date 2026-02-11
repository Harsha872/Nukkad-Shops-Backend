import axios from "axios";

export const sendToHubSpot = async ({ name, email, mobile, city }) => {
    try {
        // Check if API key is set
        if (!process.env.HUBSPOT_API_KEY) {
            throw new Error("HUBSPOT_API_KEY environment variable is not set");
        }

        console.log("📤 Sending lead to HubSpot:", { name, email, mobile, city });
        const response = await axios.post(
            "https://api.hubapi.com/crm/v3/objects/contacts?idProperty=email",
            {
                properties: {
                    firstname: name.split(' ')[0], // First name only
                    lastname: name.split(' ').slice(1).join(' ') || '', // Last name if exists
                    email: email,
                    phone: mobile,
                    city: city, // Note: This must be a custom property in HubSpot
                    lifecyclestage: "lead",
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
                    "Content-Type": "application/json",
                },
                timeout: 10000, // 10 second timeout
            }
        );

        console.log("✅ HubSpot response:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ HubSpot Error:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            config: {
                url: error.config?.url,
                method: error.config?.method,
                headers: error.config?.headers,
            }
        });
        throw error;
    }
};
