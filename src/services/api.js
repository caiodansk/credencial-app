import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://webs.pi-sesc.com.br",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
