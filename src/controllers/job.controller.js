const Job = require("../models/job.model");

exports.createJob = async (req, res) => {
  const job = await Job.create({
    ...req.body,
    createdBy: req.admin.id,
  });

  res.status(201).json(job);
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().select(
      "_id title employmentType experienceLevel workplaceType location createdAt companyName",
    );

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(job);
};

exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted successfully" });
};
// GET JOB BY ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email",
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
