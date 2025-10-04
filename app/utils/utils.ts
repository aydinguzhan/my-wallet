import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
export default class Utils {
  // 🔹 Token'daki tüm parametreleri nesne olarak al
  async getTokenPayload<T extends Record<string, any>>(): Promise<T | null> {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return null;

      const decoded = jwtDecode<T>(token);
      return decoded;
    } catch (err) {
      console.error("Token decode error:", err);
      return null;
    }
  }
  async logOut() {
    try {
      // Tokeni sil
      await AsyncStorage.removeItem("token");

      // Login ekranına yönlendir (stack sıfırlama gibi çalışır)
      router.replace("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  }
}
