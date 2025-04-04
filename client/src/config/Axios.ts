import axios from "axios";

const API_BASE_URL = "http://localhost:7070"; 

const Axios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized! Redirecting to login...");
      localStorage.removeItem("token");

        // Todo : Add Login Route
      window.location.href = "/"; 
    }
    return Promise.reject(error);
  }
);

export default Axios;
