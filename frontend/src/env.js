// env.js

// Define the variable and its values for development and production
export const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://joe-zhuang.com/api";
