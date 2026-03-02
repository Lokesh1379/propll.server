const express = require("express");
const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  getJobById,
} = require("../controllers/job.controller");

const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/post-job", protect, createJob);
router.get("/get-all-jobs", getJobs);
router.get("/get-job/:id", getJobById);
router.put("/update-job/:id", protect, updateJob);
router.delete("/delete-job/:id", protect, deleteJob);

module.exports = router;
