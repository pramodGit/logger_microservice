import { ResultSetHeader } from "mysql2";

import { pool } from "../database/mysql.js";
import { DomainEvent } from "../events/event.types.js";
import { EventRepository } from "./eventRepository.js";
import { toMysqlDateTime } from "../utils/date.js";
import { withTransaction } from "../database/transaction.js";

export class MySqlEventRepository implements EventRepository {
  async save(event: DomainEvent): Promise<void> {
    const sql = `
      INSERT INTO events (
        event_id,
        event_type,
        version,
        source,
        server_id,
        event_timestamp,
        payload
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const {
        eventId,
        eventType,
        version,
        source,
        serverId,
        timestamp,
        payload,
    } = event;

    await withTransaction(async (connection) => {
        await connection.execute<ResultSetHeader>(sql, [
            eventId,
            eventType,
            version,
            source,
            serverId,
            toMysqlDateTime(timestamp),
            JSON.stringify(payload),
        ]);
    });
  }
}