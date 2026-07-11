export const retry = async (
  operation: () => Promise<void>,
  retries = 3,
  delay = 1000
): Promise<void> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔄 Retry ${attempt}/${retries}`);

      await operation();

      return;
    } catch (err) {
      lastError = err;

      console.error(`❌ Attempt ${attempt} Failed == below is the actual issue :: ===> `);
      console.error(err);
      console.log("====================");

      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
};