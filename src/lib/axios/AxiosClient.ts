import axios from "axios";

const AxiosClient = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export default AxiosClient;
