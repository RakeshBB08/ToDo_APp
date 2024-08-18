const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/ToDoRoute");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// console.log(process.env.MONGODB_URL);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB...");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
