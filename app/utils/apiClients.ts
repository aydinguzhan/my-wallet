import AsyncStorage from "@react-native-async-storage/async-storage";
import { config } from "../config";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  endpoint: string;
  method?: HttpMethod;
  payload?: any;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = config.API_KEY; // Expo geliştirme IP'si
  }

  // 🔸 Token işlemleri (AsyncStorage ile)
  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem("token");
  }

  async setToken(token: string): Promise<void> {
    await AsyncStorage.setItem("token", token);
  }

  async clearToken(): Promise<void> {
    await AsyncStorage.removeItem("token");
  }

  // 🔸 Ana fetch metodu
  private async request<T>({
    endpoint,
    method = "GET",
    payload = null,
  }: RequestOptions): Promise<T> {
    const token = await this.getToken();

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    if (payload) {
      options.body = JSON.stringify(payload);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, options);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          console.warn("⚠️ Token expired or invalid — clearing token");
          await this.clearToken();
        }
        throw new Error(data.message || "Bir hata oluştu");
      }

      return data as T;
    } catch (err: any) {
      console.error(`❌ API ${method} Hatası (${endpoint}):`, err.message);
      throw err;
    }
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>({ endpoint, method: "GET" });
  }

  post<T>(endpoint: string, payload: any): Promise<T> {
    return this.request<T>({ endpoint, method: "POST", payload });
  }

  put<T>(endpoint: string, payload: any): Promise<T> {
    return this.request<T>({ endpoint, method: "PUT", payload });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>({ endpoint, method: "DELETE" });
  }
}

// ✅ Singleton instance olarak export
export default new ApiClient();
