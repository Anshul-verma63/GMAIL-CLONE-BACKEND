import express from "express";
import {
  sendMailController,
  getEmails,
  saveDraftEmail,
  deleteEmails,
  starredEmails,
  handleDeleteEmails,
} from "../controller/mailController.js";

const router = express.Router();

//send mail
router.post("/send-mail", sendMailController);

//get sent mails || get
router.get("/emails/:type", getEmails);

//save drafts email
router.post("/drafts-email", saveDraftEmail);

//delete emails || save to bin
router.post("/delete-emails", deleteEmails);

//starred emails || post
router.post("/starred", starredEmails);

//delete emails permanent from bin|| save to bin
router.post("/delete", handleDeleteEmails);

export default router;
