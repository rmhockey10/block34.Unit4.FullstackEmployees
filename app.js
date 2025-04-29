import express from "express";
const app = express();

import employeesRouter from "#api/employees";
export default app;

// TODO: this file!

// Parse JSON request bodies
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

//Enter route-handling middleware...

//Welcome message

// Use employeesRouter as the middleware for all requests to /employees
app.use("/employees", employeesRouter);

app.route("/").get((req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// Catch-all error-handling middleware
app.use((err, req, res, next) => {
  res.status(500).send("It's not you, it's me");
});
