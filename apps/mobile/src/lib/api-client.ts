import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Missing EXPO_PUBLIC_API_URL in .env");
}

export function createApiClient(getToken: () => Promise<string | null>) {
  const client = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
  });

  client.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isAxiosError(error)) {
        console.error(
          `[api] ${error.config?.method?.toUpperCase()} ${error.config?.url} -> ${error.response?.status}`,
        );
      }
      return Promise.reject(error);
    },
  );

  return client;
}
