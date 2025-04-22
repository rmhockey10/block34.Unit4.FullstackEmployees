import db from "#db/client";
import { createEmployee } from "./queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  const employees = [
    {
      name: "Alice Johnson",
      birthday: "1990-04-15",
      salary: 75000,
    },
    {
      name: "Bob Smith",
      birthday: "1985-11-30",
      salary: 82000,
    },
    {
      name: "Carol Davis",
      birthday: "1992-07-22",
      salary: 68000,
    },
    {
      name: "David Lee",
      birthday: "1988-02-17",
      salary: 91000,
    },
    {
      name: "Emily Clark",
      birthday: "1995-09-10",
      salary: 72000,
    },
    {
      name: "Frank Wright",
      birthday: "1991-03-05",
      salary: 79000,
    },
    {
      name: "Grace Hall",
      birthday: "1987-06-12",
      salary: 85000,
    },
    {
      name: "Henry Young",
      birthday: "1993-12-03",
      salary: 73000,
    },
    {
      name: "Isabella King",
      birthday: "1996-10-28",
      salary: 77000,
    },
    {
      name: "Jack Turner",
      birthday: "1989-01-19",
      salary: 88000,
    },
  ];

  await createEmployee(people);
  for (let i = 0; i < movies.length; i++) {
    const employee = employees[i];
    await createEmployee(employee);
  }
}
