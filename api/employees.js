import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";
const router = express.Router();
export default router;

// TODO: this file!

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Use this regex to test if `id` string is a positive integer
  // There are other ways to test, such as `isNaN`, but regex is commonly used when testing strings
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("Invalid request parameter");
  }

  const employee = await getEmployee(id); // Need to await the result of getEmployee since its async

  // Check if the database returned a value after the delete action
  // If the value is undefined, there was no row in the table with the provided id
  if (!employee) {
    return res.status(404).send("Resource not found");
  }

  res.send(employee);
});

router.delete("/:id", async (req, res) => {
  // We want to grab the user id from the route param, not the body.  The body will unlikley contain information used to delete.
  const { id } = req.params;

  // Use this regex to test if `id` string is a positive integer
  // There are other ways to test, such as `isNaN`, but regex is commonly used when testing strings
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("Invalid request parameter");
  }

  const employee = await deleteEmployee(id);

  if (!employee) {
    return res.status(404).send("Resource not found");
  }

  res.sendStatus(204);
});
router.put("/:id", async (req, res) => {
  // We want to grab the user id from the route param, not the body
  const { id } = req.params;

  // Use this regex to test if `id` string is a positive integer
  // There are other ways to test, such as `isNaN`, but regex is commonly used when testing strings
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("Invalid request parameter");
  }

  if (!req.body) return res.status(400).send("Request must have a body.");

  const { name, birthday, salary } = req.body;

  if (!name || !birthday || !salary)
    return res.status(400).send("Missing required info");

  const employee = await updateEmployee({
    id,
    name,
    birthday,
    salary,
  });

  // Check if the database returned a value after the delete action
  // If the value is undefined, there was no row in the table with the provided id
  if (!employee) {
    return res.status(404).send("Resource not found");
  }

  res.send(employee);
});

router
  .route("/")
  .get(async (req, res) => {
    const employees = await getEmployees();
    res.send(employees);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body must be provided");
    if (!req.body.name || !req.body.birthday || !req.body.salary)
      return res.status(400).send("Missing required info");
    const newEmployee = await createEmployee(req.body);
    return res.status(201).send(newEmployee);
  });
