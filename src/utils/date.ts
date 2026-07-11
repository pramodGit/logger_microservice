export const toMysqlDateTime = (
  isoDate: string
): string => {
  return new Date(isoDate)
    .toISOString()
    .slice(0, 23)
    .replace("T", " ")
    .replace("Z", "");
};