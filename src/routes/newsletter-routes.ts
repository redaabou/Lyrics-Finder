import e, { Router } from "express";
const router = Router();
import { sendMailToAllSubs, subscribe, unsubscribe } from "../controllers/newsletter-controller";

router.get("/sendMails", sendMailToAllSubs);
router.put("/subscribe/:id", subscribe);
router.put("/unsubscribe/:id", unsubscribe);

export { router as newsletterRoute };