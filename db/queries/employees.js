import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  // TODO

  const text = `
  INSERT INTO employees
    (name, birthday, salary)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const values = [name, birthday, salary];

  const res = await db.query(text, values);
  return res.rows[0];
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  // TODO
  const sql = `SELECT * FROM employees`;
  const { rows: employees } = await db.query(sql);
  return employees;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  // TODO

  const sql = `SELECT * from employees WHERE id = $1`;
  const {
    rows: [employee],
  } = await db.query(sql, [id]);
  return employee;
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  // TODO

  const sql = `UPDATE employees
  SET
  name = $2, birthday = $3, salary = $4
  WHERE ID = $1
  RETURNING *`;
  const {
    rows: [employee],
  } = await db.query(sql, [id, name, birthday, salary]);
  return employee;
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  // TODO

  const sql = `DELETE from employees
  WHERE id = $1
  RETURNING *`;
  const {
    rows: [employee],
  } = await db.query(sql, [id]);
  return employee;
}
