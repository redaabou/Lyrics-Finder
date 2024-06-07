import { Router } from "express";
const router = Router();
import { sendMailToAllSubs, subscribe, unsubscribe } from "../controllers/newsletter-controller";
import { requireAuth } from "../middlewares/auth-middleware";

router.get("/sendMails", sendMailToAllSubs);
router.put("/subscribe", requireAuth,subscribe);
router.put("/unsubscribe",requireAuth, unsubscribe);

export { router as newsletterRoute };