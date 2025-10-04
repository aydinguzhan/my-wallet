import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Utils from "../utils/utils";

export default function Profile() {
  const utils = new Utils();
  const handleLogOut = async () => {
    utils.logOut();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1E1E2C" }}>
      <ScrollView style={styles.container}>
        {/* Üst bölüm: avatar ve kullanıcı bilgileri */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
            style={styles.avatar}
          />
          <Text style={styles.username}>Oguzhan AYDIN</Text>
          <Text style={styles.email}>oguzhan@mail.com</Text>
        </View>

        {/* Profil aksiyonları */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Hesap Ayarları</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Bildirim Ayarları</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Destek</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.logoutButton]}
            onPress={handleLogOut}
          >
            <Text style={[styles.actionText, styles.logoutText]}>
              Çıkış Yap
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2C",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  username: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    color: "#ccc",
    fontSize: 16,
  },
  actions: {},
  actionButton: {
    backgroundColor: "#2A2A3A",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#F44336",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
