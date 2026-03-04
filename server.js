require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

// Connect database
connectDB();

// Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
module.exports = app;
