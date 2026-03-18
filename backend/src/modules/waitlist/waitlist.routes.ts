import express from "express";
import { notifyWaitlistController } from "./waitlist.controller.js";

const router = express.Router();

router.post("/notify", notifyWaitlistController);

export default router;
