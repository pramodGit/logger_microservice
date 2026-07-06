# This is the real distributed architecture.

                    Ubuntu VM

+-----------------------------------------------+
|                                               |
|  Monitoring Agent                             |
|                                               |
|  CPU Monitor                                  |
|  Memory Monitor                               |
|  Disk Monitor                                 |
|  Process Monitor                              |
|         │                                     |
|         ▼                                     |
|    Kafka Producer                             |
|         │                                     |
+---------|-------------------------------------+
          │
          ▼
     +--------------------+
     |   Kafka Broker     |
     | monitoring-events  |
     +--------------------+
          ▲
          │
+---------|-------------------------------------+
|         ▼                                     |
|  Logger Microservice                          |
|                                               |
|  Kafka Consumer                               |
|                                               |
+-----------------------------------------------+