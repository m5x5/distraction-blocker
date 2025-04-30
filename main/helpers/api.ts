require("dotenv").config();

export const apiUrl = "http://localhost:3000";
export const audienceUrl = "http://localhost:3000";
export const leptumApi =
  process.env.LEPTUM_API || "http://localhost:3000";
