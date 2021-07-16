const express = require("express");
const app = express();
const port = 3001;

const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//Import routes
const authRoute = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");
const flatRoute = require("./routes/flat");
const jobRoute = require("./routes/job");

// Middleware
app.use(express.json());
app.use(cors());

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB")
);

//Route Middleware
app.use("/api/user", authRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/flat", flatRoute);
app.use("/api/job", jobRoute);

//Server running
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
