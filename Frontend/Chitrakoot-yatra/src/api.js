import axios from "axios";

const api = axios.create({
  baseURL: "https://tour-ckt.onrender.com", 
  withCredentials: true, 
});


api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    // If token expired (401) and it's not a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        
        await api.post("/api/refresh");

        // Retry the original request with new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Redirect to login if refresh also fails
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
