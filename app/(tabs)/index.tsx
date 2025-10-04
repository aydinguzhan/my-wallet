import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Home() {
  const cards = [
    {
      title: "Toplam Bakiye",
      amount: "₺12,345.67",
      change: "+5%",
      icon: "💰",
      bgColor: "#174e8cff",
    },
    {
      title: "Toplam Harcama",
      amount: "₺3,200",
      change: "-2%",
      icon: "🛒",
      bgColor: "#790d06ff",
    },
    {
      title: "Toplam Gelir",
      amount: "₺15,500",
      change: "+10%",
      icon: "💳",
      bgColor: "#125f15ff",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1E1E2C" }}>
      <ScrollView style={styles.container}>
        {/* Yatay kayan kartlar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsScroll}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {cards.map((card, index) => (
            <View
              key={index}
              style={[styles.card, { backgroundColor: card.bgColor }]}
            >
              <Text style={styles.cardIcon}>{card.icon}</Text>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardAmount}>{card.amount}</Text>
              <Text
                style={[
                  styles.cardChange,
                  { color: card.change.includes("+") ? "#4CAF50" : "#F44336" },
                ]}
              >
                {card.change} son 7 gün
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Hızlı işlemler */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Gönder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Al</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Geçmiş</Text>
          </TouchableOpacity>
        </View>

        {/* Son işlemler */}
        <View style={styles.transactions}>
          <Text style={styles.sectionTitle}>Son İşlemler</Text>

          <View style={styles.transactionItem}>
            <Text style={styles.transactionTitle}>Elektrik Faturası</Text>
            <Text style={styles.transactionAmountNegative}>-₺200</Text>
          </View>

          <View style={styles.transactionItem}>
            <Text style={styles.transactionTitle}>Para Yatırma</Text>
            <Text style={styles.transactionAmountPositive}>+₺1,000</Text>
          </View>

          <View style={styles.transactionItem}>
            <Text style={styles.transactionTitle}>Kira</Text>
            <Text style={styles.transactionAmountNegative}>-₺2,500</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1E2C", padding: 20 },

  cardsScroll: {
    marginBottom: 30,
  },
  card: {
    width: width * 0.7,
    height: 200, // yükseklik artırıldı
    borderRadius: 16,
    padding: 20,
    marginRight: 15,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 6,
  },
  cardIcon: { fontSize: 28, marginBottom: 10 },
  cardTitle: { color: "#fff", fontSize: 16, marginBottom: 5 },
  cardAmount: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardChange: { fontSize: 12, fontWeight: "500" },

  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: "#333",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  actionText: { color: "#fff", fontWeight: "bold" },

  transactions: { marginBottom: 30 },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "bold",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2A2A3A",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  transactionTitle: {
    color: "#fff",
  },
  transactionAmountPositive: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  transactionAmountNegative: {
    color: "#F44336",
    fontWeight: "bold",
  },
});
