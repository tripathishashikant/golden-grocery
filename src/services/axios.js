import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchUserData = () => {
  return api.get("/users");
};

api.interceptors.request.use(
  (config) => {
    // Add authentication headers or perform other global request tasks
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Handle successful responses globally
    return response;
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default api;

export { fetchUserData };
