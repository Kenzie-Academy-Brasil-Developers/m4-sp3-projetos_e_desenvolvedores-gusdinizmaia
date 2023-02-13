import { Client } from "pg";
import "dotenv/config";

const client = new Client({
  user: process.env.DB_user,
  password: process.env.DB_password,
  host: process.env.DB_host,
  database: process.env.DB_database,
  port: parseInt(process.env.DB_port!),
});

export { client };
