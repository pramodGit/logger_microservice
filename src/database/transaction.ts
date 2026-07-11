import { PoolConnection } from "mysql2/promise";
import { pool } from "./mysql.js";

export const withTransaction = async <T>(
  callback: (connection: PoolConnection) => Promise<T>
): Promise<T> => {
  const connection = await pool.getConnection();

  try {
    console.log("🟢 BEGIN");

    await connection.beginTransaction();

    const result = await callback(connection);

    await connection.commit();

    console.log("🟢 COMMIT");

    return result;
  } catch (err) {
    await connection.rollback();

    console.log("🔴 ROLLBACK");

    throw err;
  } finally {
    connection.release();
  }
};