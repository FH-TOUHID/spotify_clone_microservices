import transporter from "../config/mail.js";

async function sendEmail(to, subject, html) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to,

    subject,

    html,
  });

  console.log("Email sent to:", to);
}

export default sendEmail;
