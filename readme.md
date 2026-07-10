# Logger Service

A production-style Kafka Consumer microservice that receives monitoring events, processes them reliably, and demonstrates enterprise messaging patterns.

---

# Features

- Kafka Consumer
- Consumer Groups
- Multiple Partitions
- Manual Offset Management
- Retry Mechanism
- Dead Letter Queue (DLQ)
- Idempotent Consumer
- Domain Event Processing
- Clean Architecture

---

# Tech Stack

- Node.js
- TypeScript
- KafkaJS
- Apache Kafka

---

# Project Structure

```
src
│
├── kafka
│   ├── consumer.ts
│   ├── producer.ts
│   ├── publishDLQ.ts
│   └── commitOffset.ts
│
├── services
│   └── processEvent.ts
│
├── storage
│   └── processedEvents.ts
│
├── utils
│   └── retry.ts
│
└── app.ts
```

---

# Event Flow

```
Monitoring Agent
        │
        ▼
Kafka Producer
        │
        ▼
Kafka Topic (monitoring-events)
        │
        ▼
Logger Consumer
        │
        ▼
JSON Parse
        │
        ▼
Retry
        │
        ▼
Idempotent Check
        │
        ▼
Business Processing
        │
        ▼
Manual Offset Commit
```

If processing fails:

```
Retry
   │
   ▼
Still Failed
   │
   ▼
Publish to DLQ
   │
   ▼
Commit Offset
```

---

# Event Format

```json
{
  "eventId": "abc123",
  "eventType": "cpu.high",
  "version": 1,
  "source": "node-monitoring-agent",
  "serverId": "server-1",
  "timestamp": "2026-07-10T10:00:00Z",
  "payload": {
    "usage": 95
  }
}
```

---

# Reliability Features

## Retry

Transient failures are retried before considering a message failed.

---

## Manual Offset Management

Offsets are committed only after successful processing.

```
Process Event
      │
      ▼
Commit Offset
```

---

## Dead Letter Queue

Messages that fail after all retries are published to:

```
monitoring-events-dlq
```

before committing their offsets.

---

## Idempotent Consumer

Duplicate events are ignored using:

```
eventId
```

to prevent duplicate processing.

---

# Environment Variables

```
KAFKA_BROKER=localhost:9092

KAFKA_TOPIC=monitoring-events

DLQ_TOPIC=monitoring-events-dlq

GROUP_ID=logger-group
```

---

# Run

Install dependencies

```
npm install
```

Start service

```
npm start
```

---

# Kafka Concepts Demonstrated

- Event Driven Architecture
- Kafka Producer
- Kafka Consumer
- Consumer Groups
- Topic Partitions
- Manual Offset Management
- Retry Strategy
- Dead Letter Queue
- Idempotent Consumer

---

# Future Enhancements

- Event Versioning
- Schema Validation
- Event Routing
- Redis-based Idempotency
- Persistent Storage
- Prometheus Metrics
- Grafana Dashboards
- Docker Deployment
- Kubernetes Deployment

# Architecture Maturity

Phase 1  ✅ Event-Driven Foundation
Phase 2  ✅ Reliable Message Processing
Phase 3  ✅ Event Contracts & Versioning
Phase 4  🚧 Event Routing & Handler Architecture
Phase 5  🚧 Persistence Layer
Phase 6  🚧 Alert Engine
Phase 7  🚧 Scalability
Phase 8  🚧 Observability
Phase 9  🚧 Security
Phase 10 🚧 Production Readiness
Phase 11 🚧 Enterprise Event Platform