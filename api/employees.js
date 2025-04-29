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
  console.log(typeof id);
  const idNUM = Number(id);
  console.log(idNUM);
  console.log(typeof idNUM);
  if (idNUM < 0) return res.status(400);
  if (!idNUM) return res.status(404);

  const employee = getEmployee(idNUM);
  res.send(employee);
});

router.delete("/:id", async (req, res) => {
  if (req.body.id < 0) return res.status(400);
  if (!req.body.id) return res.status(404);
  await deleteEmployee(req.employee.id);
  res.sendStatus(204);
});
router.put("/:id", async (req, res) => {
  if (!req.body) return res.status(400).send("Request must have a body.");
  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary)
    return res.status(400).send("Missing required info");
  if (!req.body.id) return res.status(404);

  const employee = await updateEmployee({
    id: req.movie.id,
    name,
    releaseDate,
    runningTime,
  });
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
