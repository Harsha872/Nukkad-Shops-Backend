import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import brochureRoutes from "./routes/brochureRoutes.js";
import { connectDB } from "./config/database.js";

dotenv.config();
console.log("🔑 HUBSPOT TOKEN LOADED:", !!process.env.HUBSPOT_API_KEY);
console.log("🗄️ DB PASSWORD LOADED:", !!process.env.DB_PASSWORD);

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();



app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️ Incoming request:", req.method, req.url);
  console.log("📦 Body:", req.body);
  next();
});


// Connect MySQL
connectDB();

// Serve static assets (e.g. PDFs) from backend/public
// Place your files in: backend/public
app.use("/static", express.static(path.join(__dirname, "..", "public")));

// API
app.use("/api/brochure", brochureRoutes);

// Brochure PDF – force download with Content-Disposition: attachment
app.get("/brochure", (req, res) => {
  const brochurePath = path.join(__dirname, "..", "..", "NS_Brochure (1).pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="Nukkad_Shops_Brochure.pdf"');
  res.sendFile(brochurePath);
});

app.get("/", (req, res) => {
  res.send("Backend running successfully ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
