const express = require("express");
const router = express.Router();

const {
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");

const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

// Create admin
router.post("/create", protect, authorize("superadmin"), createAdmin);

// Get all admins
router.get("/get-all-admins", protect, authorize("superadmin"), getAllAdmins);

// Update admin
router.put("/update-admin/:id", protect, authorize("superadmin"), updateAdmin);

// Delete admin
router.delete(
  "/delete-admin/:id",
  protect,
  authorize("superadmin"),
  deleteAdmin,
);

module.exports = router;
