import nodemailer from "nodemailer";
import mailModal from "../model/mailModal.js";

export const sendMailController = async (req, res) => {
  const { email, name, sms } = req.body;

  const newMail = await new mailModal(req.body).save();

  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOption = {
    from: process.env.EMAIL,
    to: email,
    subject: name,
    text: `my message is ${sms}`,
    html: ` my message is ${sms}`,
  };
  //save email

  transport.sendMail(mailOption, (error, info) => {
    if (error) {
      res.status(400).send({
        success: false,
        message: "Error",
      });
    }
    res.status(200).send({
      success: true,
      message: "Email send",
      newMail,
    });
  });
};

//save drfts-email
export const saveDraftEmail = async (req, res) => {
  try {
    const newMail = await new mailModal(req.body).save();
    res.status(200).send({
      success: true,
      message: "Draft-email save",
      newMail,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Error while save draft Email",
      error,
    });
  }
};
//get emails
export const getEmails = async (req, res) => {
  try {
    let emails;
    if (req.params.type === "bin") {
      emails = await mailModal.find({ bin: true });
    } else if (req.params.type === "allmail") {
      emails = await mailModal.find({});
    } else if (req.params.type === "starred") {
      emails = await mailModal.find({ starred: true, bin: false });
    } else {
      emails = await mailModal.find({ type: req.params.type });
    }
    res.status(200).send({
      success: true,
      message: "Successfully get emails",
      emails,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Error while get Emails",
      error,
    });
  }
};

//delete emails
export const deleteEmails = async (req, res) => {
  try {
    await mailModal.updateMany(
      { _id: { $in: req.body } },
      { $set: { bin: true, starred: false, type: "" } }
    );

    return res.status(200).send({
      success: true,
      message: "Email deleted successfully",
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Error while delete Emails",
      error,
    });
  }
};

//starred emails
export const starredEmails = async (req, res) => {
  try {
    await mailModal.updateOne(
      { _id: req.body.id },
      {
        $set: { starred: req.body.value },
      }
    );
    return res.status(200).send({
      success: true,
      message: "Email starred success",
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error while starred Emails",
      error,
    });
  }
};

//delete email from bin
export const handleDeleteEmails = async (req, res) => {
  try {
    await mailModal.deleteMany({ _id: { $in: req.body } });
    return res.status(200).send({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(501).send({
      success: false,
      message: "Error while delete Emails",
      error,
    });
  }
};
