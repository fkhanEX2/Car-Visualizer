import axios from "axios";

const defaultOptions = {
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(defaultOptions);

export default instance;
