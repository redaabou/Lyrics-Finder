import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (subscribers) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: subscribers.map((subscriber) => subscriber.email).join(","),
    subject: "Welcome to our Newsletter!",
    text: "Thank you for subscribing to our newsletter. You will now receive regular updates from us.",
  });
};

export { sendEmail };
