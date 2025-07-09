export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER: "/api/v1/auth/getUser",
  },

  DASHBOARD: {
    GET_STATS: "/api/v1/dashboard/stats",
  },

  SUBSCRIPTIONS: {
    GET_ALL: "/api/v1/subscriptions",                   // GET
    GET_BY_ID: (id) => `/api/v1/subscriptions/${id}`,   // GET
    CREATE: "/api/v1/subscriptions",                    // POST
    UPDATE: (id) => `/api/v1/subscriptions/${id}`,      // PUT
    DELETE: (id) => `/api/v1/subscriptions/${id}`,      // DELETE
  },

  IMAGE: {
    UPLOAD: "/api/v1/auth/upload-image",
  },
};
