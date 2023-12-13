import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql
  .createPool({
    connectionLimit: 2,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_ROOT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();
