const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject, name, link) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const options = () => {
      return {
        from: process.env.SMTP_USERNAME,
        to: email,
        subject: subject,
        text:  'Hi'+ name + ',you can reset the password by access this link : ' + link
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error)
        return error;
      } else {
        console.log(info)
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze", link : "nxnxnx" },
);
*/

module.exports = sendEmail;