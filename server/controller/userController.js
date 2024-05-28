const nodemailer = require("nodemailer");
const User = require("../model/user");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, phone, eventSession } = req.body;
    // Basic server-side validation
    if (!fullName || !phone || !eventSession) {
      return res.status(400).json({
        error: "Full Name, Phone Number, and Event Session are required",
      });
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    const newUser = new User({ fullName, email, phone, eventSession });
    await newUser.save();

    // // Send confirmation email
    // const mailOptions = {
    //   from: process.env.EMAIL_USER, // your email address
    //   to: email,
    //   subject: "Event Registration Confirmation",
    //   text: `
    //     Thank you for registering!

    //     Here are your registration details:
    //     Full Name: ${fullName}
    //     Email: ${email}
    //     Phone: ${phone}
    //     Event Session: ${eventSession}

    //     Your registration ID is: ${newUser._id}
    //   `,
    // };
    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER, // your email address
      to: email,
      subject: "🎉 You're Registered! Confirmation for Your Event Registration",
      text: `
    Hi ${fullName},

    🎉 Thank you for registering for our event! We're thrilled to have you with us.

    Here are your registration details:

    - Full Name: ${fullName}
    - Email: ${email}
    - Phone: ${phone}
    - Event Session: ${eventSession}

    Your unique registration ID is: ${newUser._id}

    👉 [Add this event to your calendar](#) to make sure you don't miss it!

    Meanwhile, feel free to check out our [event guide](#) for more information on what to expect and how to prepare.

    If you have any questions, simply reply to this email or contact us at [support@example.com](mailto:support@example.com).

    Looking forward to seeing you at the event!

    Best regards,
    The Event Team
  `,
      html: `
    <p>Hi ${fullName},</p>
    <p>🎉 Thank you for registering for our event! We're thrilled to have you with us.</p>
    <p>Here are your registration details:</p>
    <ul>
      <li><strong>Full Name:</strong> ${fullName}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Phone:</strong> ${phone}</li>
      <li><strong>Event Session:</strong> ${eventSession}</li>
    </ul>
    <p>Your unique registration ID is: <strong>${newUser._id}</strong></p>
    <p>👉 <a href="#">Add this event to your calendar</a> to make sure you don't miss it!</p>
    <p>Meanwhile, feel free to check out our <a href="#">event guide</a> for more information on what to expect and how to prepare.</p>
    <p>If you have any questions, simply reply to this email or contact us at <a href="mailto:sidansari20@gmail.com">support@example.com</a>.</p>
    <p>Looking forward to seeing you at the event!</p>
    <p>Best regards,<br>The Event Team</p>
  `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({
      userData: newUser,
      message: "Registration successful",
      id: newUser._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = exports;
