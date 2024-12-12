const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const productRouter = require("./routers/products");

const app = express();

require("dotenv/config");
app.use(cors());
app.options("*", cors());
const api = process.env.API_URL;

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

// Routers
app.use(`${api}/products`, productRouter);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes

app.listen(3000, () => {
  console.log(api);
  console.log("Server is running on http://localhost:3000");
});
