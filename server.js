const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/auth.routes");
const adminRoutes = require("./src/routes/admin.routes");
const jobRoutes = require("./src/routes/job.routes");
const emailRoutes = require("./src/routes/email.routes");
const connectDB = require("./src/config/db");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:8080", "https://uiokbg.alturaitech.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/job", emailRoutes);

// local server
// if (process.env.NODE_ENV !== "production") {
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
// }

module.exports = app;
