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
import api from "./utils/apiClients";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password)
      return Alert.alert("Hata", "Email ve şifre gerekli");

    setLoading(true);
    try {
      const res = await api.post<{ token: string; user: any }>("/auth/login", {
        email,
        password,
      });
      api.setToken(res.token);

      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("Hata", err.message || "Giriş yapılamadı");
      console.log(err);
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
        <Text style={styles.subtitle}>Email ve şifrenizi girin</Text>

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
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? "Yükleniyor..." : "Giriş Yap"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/register")}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>Hesabın yok mu? Kayıt Ol</Text>
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
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  registerLink: { marginTop: 20 },
  registerText: {
    color: "#fff",
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
