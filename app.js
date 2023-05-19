const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

require("dotenv").config();
const portNumber = process.env.API_PORT || 5000;
const { DB_URI } = process.env;
console.log(DB_URI);

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use("/users", userRouter);
app.use("/products", productRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(portNumber, (err) => {
  if (!err) return console.log(`server starts on port ${portNumber}`);
  console.log(err);
});
