const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");

exports.createAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json(admin);
};
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE ADMIN
exports.updateAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Prevent updating superadmin role
    if (admin.role === "superadmin") {
      return res.status(403).json({
        success: false,
        message: "Superadmin cannot be modified",
      });
    }

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (role) admin.role = role;

    if (password) {
      admin.password = await bcrypt.hash(password, 10);
    }

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE ADMIN
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Prevent deleting superadmin
    if (admin.role === "superadmin") {
      return res.status(403).json({
        success: false,
        message: "Superadmin cannot be deleted",
      });
    }

    await admin.deleteOne();

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
