import { logger } from "../logger/logger.js";
import { eventsRetried } from "../metrics/metrics.js";

export const retry = async (
  operation: () => Promise<void>,
  retries = 3,
  delay = 1000
): Promise<void> => {

  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {

    logger.info(
      {
        attempt,
        retries,
      },
      "Retry attempt"
    );

    try {

      await operation();
      return;

    } catch (err) {

      lastError = err;

      logger.error(
        {
          attempt,
          retries,
          error: err instanceof Error ? err.message : err,
        },
        "Retry attempt failed"
      );

      if (attempt < retries) {
        eventsRetried.inc();

        await new Promise(resolve =>
          setTimeout(resolve, delay)
        );
      }
    }
  }

  throw lastError;
};