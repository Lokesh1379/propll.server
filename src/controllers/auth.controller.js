// const Admin = require("../models/admin.model");
// const bcrypt = require("bcryptjs");
// const generateToken = require("../utils/generateToken");

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const admin = await Admin.findOne({ email });
//   if (!admin) return res.status(400).json({ message: "Invalid credentials" });

//   const isMatch = await bcrypt.compare(password, admin.password);
//   if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//   const token = generateToken(admin);

//   res.json({ token });
// };

const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("got request");

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin);

    // remove password before sending response
    const adminData = {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };

    res.json({
      token,
      admin: adminData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
