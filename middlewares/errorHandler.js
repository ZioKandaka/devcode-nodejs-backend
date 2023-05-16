const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function errorHandler(err, req, res, next) {
  if (err.name === "NotFound") {
    res
      .status(404)
      .json({ status: "Not found", message: "Resource not found" });
  } else if (err.name === "ActivityNotFound") {
    res.status(404).json({
      status: "Not Found",
      message: `Activity with ID ${err.id} not found`,
    });
  } else if (err.name === "TodoNotFound") {
    res.status(404).json({
      status: "Not Found",
      message: `Todo with ID ${err.id} not found`,
    });
  } else if (err.name === "NullID") {
    res.status(400).json({
      status: "Bad request",
      message: "Activity ID is required",
    });
  } else if (err.name === "SequelizeValidationError") {
    res.status(400).json({ status: "Failed", message: err.errors[0].message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = errorHandler;
