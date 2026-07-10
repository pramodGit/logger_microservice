const processedEvents = new Set<string>();

export const hasProcessed = (eventId: string) => {
  return processedEvents.has(eventId);
};

export const markProcessed = (eventId: string) => {
  processedEvents.add(eventId);
};