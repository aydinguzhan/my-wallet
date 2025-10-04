import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default class Utils {
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
