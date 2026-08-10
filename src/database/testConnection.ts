import { logger } from "../logger/logger.js";
import { pool } from "./mysql.js";

export const testDatabaseConnection = async () => {
  try {

    const connection = await pool.getConnection();

    logger.info("MySQL Connected");

    connection.release();
  } catch (err) {
    console.error("❌ MySQL Connection Failed");

    throw err;
  }
};