require('dotenv').config();

const { env } = process;

const db = {
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
};

export default db;
