require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin.model");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const exists = await Admin.findOne({ role: "superadmin" });

  if (!exists) {
    const hashed = await bcrypt.hash("Propll.ceo1@propll.com", 10);

    await Admin.create({
      name: "Pradeep",
      email: "propll.ceo@propll.com",
      password: hashed,
      role: "superadmin",
    });

    console.log("Super Admin created");
  }

  process.exit();
});
