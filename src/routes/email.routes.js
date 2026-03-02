const express = require("express");
const router = express.Router();
const upload = require("../config/multer.js");
const { submitApplication } = require("../controllers/email.controller");

router.post("/apply", upload.single("resume"), submitApplication);

module.exports = router;
