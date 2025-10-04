import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import api from "./utils/apiClients"; // singleton ApiClient

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      return Alert.alert("Hata", "Tüm alanlar gerekli");
    }

    setLoading(true);
    try {
      const res = await api.post<{ token: string; user: any }>(
        "/auth/register",
        {
          username,
          email,
          password,
        }
      );

      // Token'ı sakla
      await api.setToken(res.token);

      // Başarılı kayıt sonrası router ile geçiş
      router.replace("/(tabs)");
    } catch (err: any) {
      console.error("Register hatası:", err.message);
      Alert.alert("Hata", err.message || "Kayıt yapılamadı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#1E1E2C", "#4A4A6A", "#1E1E2C"]}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Hoşgeldiniz!</Text>
        <Text style={styles.subtitle}>Yeni bir hesap oluşturun</Text>

        <TextInput
          placeholder="Kullanıcı Adı"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Şifre"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading ? "Yükleniyor..." : "Kayıt Ol"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/login")}
          style={styles.loginLink}
        >
          <Text style={styles.loginText}>
            Zaten hesabınız var mı? Giriş Yap
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center", paddingHorizontal: 30 },
  container: { width: "100%", alignItems: "center" },
  title: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 5 },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: "#fff",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  loginLink: { marginTop: 20 },
  loginText: { color: "#fff", textDecorationLine: "underline", fontSize: 14 },
});
