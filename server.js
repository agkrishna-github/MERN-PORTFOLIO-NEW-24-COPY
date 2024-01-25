require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConfig");
const portfolioRoute = require("./routes/portfolioRoute");

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/api/portfolio", portfolioRoute);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
