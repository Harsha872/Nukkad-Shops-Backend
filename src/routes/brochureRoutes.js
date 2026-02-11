import express from "express";
import { submitBrochureLead } from "../controllers/brochureControllers.js";

const router = express.Router();

router.post("/", submitBrochureLead);

export default router;
