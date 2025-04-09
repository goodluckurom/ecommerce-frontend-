const isDevelopment = import.meta.env.MODE === "development";

export const server = isDevelopment
  ? "http://localhost:8000/api/v2"
  : import.meta.env.VITE_BACKEND_URL + "/api/v2";

export const imageUrl = isDevelopment
  ? "http://localhost:8000/"
  : import.meta.env.VITE_BACKEND_URL + "/";
