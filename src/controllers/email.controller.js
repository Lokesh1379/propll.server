// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.hostinger.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// exports.submitApplication = async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Resume is required" });
//     }

//     await transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to: process.env.RECEIVER_EMAIL,
//       subject: `New Application from ${name}`,
//       html: `
//         <h3>Applicant Details</h3>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone}</p>
//         <p><b>Message:</b> ${message}</p>
//       `,
//       attachments: [
//         {
//           filename: req.file.originalname,
//           content: req.file.buffer,
//         },
//       ],
//     });

//     res.status(200).json({ message: "Application sent successfully" });
//   } catch (error) {
//     console.error("Email Error:", error);
//     res.status(500).json({ message: "Failed to send application" });
//   }
// };

const nodemailer = require("nodemailer");

// Create transporter once (not inside function)
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Optional: verify SMTP connection at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server Ready");
  }
});

exports.submitApplication = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "Name, email and phone are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Resume PDF is required",
      });
    }

    // Send email with resume buffer (NOT saved anywhere)
    await transporter.sendMail({
      from: `"Job Application" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email, // So you can directly reply to candidate
      subject: `New Application from ${name}`,
      html: `
        <h3>Applicant Details</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message || "N/A"}</p>
      `,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer, // 🔥 memory buffer only
          contentType: "application/pdf",
        },
      ],
    });

    return res.status(200).json({
      message: "Application sent successfully",
    });
  } catch (error) {
    console.error("Email Error:", error);

    return res.status(500).json({
      message: "Failed to send application",
    });
  }
};
