const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    companyLogo: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    responsibilities: [
      {
        type: String,
      },
    ],

    requirements: [
      {
        type: String,
      },
    ],

    benefits: [
      {
        type: String,
      },
    ],

    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      required: true,
    },

    experienceLevel: {
      type: String,
      enum: ["Entry level", "Mid-Senior level", "Senior", "Director"],
      required: true,
    },

    skills: [
      {
        type: String,
        index: true,
      },
    ],

    workplaceType: {
      type: String,
      enum: ["On-site", "Remote", "Hybrid"],
      required: true,
    },

    location: {
      country: { type: String, required: true },
      state: { type: String },
      city: { type: String },
    },

    salary: {
      currency: {
        type: String,
        default: "USD",
      },
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
      isNegotiable: {
        type: Boolean,
        default: false,
      },
    },

    applicationUrl: {
      type: String,
      default: "",
    },

    applicationEmail: {
      type: String,
    },

    totalApplicants: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Draft", "Open", "Closed", "Expired"],
      default: "Draft",
      index: true,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: false,
    },

    expiresAt: {
      type: Date,
    },

    views: {
      type: Number,
      default: 0,
    },

    saves: {
      type: Number,
      default: 0,
    },

    tags: [
      {
        type: String,
        index: true,
      },
    ],
  },
  { timestamps: true },
);

/**
 * Auto-expire job if expiresAt is passed
 */
// jobSchema.pre("save", function (next) {
//   if (this.expiresAt && this.expiresAt < new Date()) {
//     this.status = "Expired";
//   }
//   next();
// });

module.exports = mongoose.model("Job", jobSchema);
