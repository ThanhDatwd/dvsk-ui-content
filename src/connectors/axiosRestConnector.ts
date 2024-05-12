import axios from "axios";

const restConnector = axios.create({
  baseURL: process.env.DVSK_NEXT_PUBLIC_STATIC_API_URL,
});
restConnector.interceptors.request.use((config) => {
  config.headers["ngrok-skip-browser-warning"] = true;
  return config;
});
export default restConnector;
