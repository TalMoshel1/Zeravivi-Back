const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

const emailUser = process.env.EMAIL_USER1;
const emailPassword = process.env.EMAIL_PASSWORD1;
const port = process.env.PORT;

console.log('?')

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "POST",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "recipient-email@example.com", 
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
