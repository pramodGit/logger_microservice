import pkg from "../../package.json";

export const APP_INFO = Object.freeze({
  name: pkg.name,
  version: pkg.version,
  environment: process.env.NODE_ENV ?? "development",
});