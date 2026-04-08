import express from "express";
import { joinWaitlistController, getPilotWaitlistController, notifyWaitlistController } from "./waitlist.controller.js";

const router = express.Router();

router.post("/join",   joinWaitlistController);       // form submission → saves to DB + sends email
router.get("/",        getPilotWaitlistController);   // admin: list all registrations
router.post("/notify", notifyWaitlistController);     // manual trigger (legacy)

export default router;
