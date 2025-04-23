import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
const db = new pg.Client(
  process.env.DATABASE_URL ||
    "postgres://reesm:1234@localhost:5432/fullstack_employees"
);
export default db;
