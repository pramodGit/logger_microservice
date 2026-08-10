import { PoolConnection } from "mysql2/promise";
import { pool } from "./mysql.js";
import { logger } from "../logger/logger.js";

export const withTransaction = async <T>(
  callback: (connection: PoolConnection) => Promise<T>
): Promise<T> => {
  const connection = await pool.getConnection();

  try {
    logger.info("🟢 BEGIN");

    await connection.beginTransaction();

    const result = await callback(connection);

    await connection.commit();

    logger.info("🟢 COMMIT");

    return result;
  } catch (err) {
    await connection.rollback();

    logger.info("🔴 ROLLBACK");

    throw err;
  } finally {
    connection.release();
  }
};