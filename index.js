const express = require("express");
const app = express();
const port = 3001;

// const mongoose = require("mongoose");
// require("dotenv").config();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
