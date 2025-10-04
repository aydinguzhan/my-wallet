import services from "@/services/services";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Utils from "../utils/utils";

const { width } = Dimensions.get("window");

export default function Home() {
  const utils = new Utils();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeAccount = accounts[activeIndex];

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const payload = await utils.getTokenPayload<{
          id: string;
          email: string;
          username: string;
        }>();
        if (!payload) return;

        const fetchedAccounts =
          await services.Accounts.getAccountsWithTransactions(payload.id);

        setAccounts(fetchedAccounts);
      } catch (err) {
        console.error("Hata:", err);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1E1E2C" }}>
      {/* Yatay hesap kartları */}
      <FlatList
        data={accounts}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingHorizontal: 10, marginTop: 20 }}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor:
                  item.transactions?.filter((trs: any) => trs.type === "income")
                    .length > 0
                    ? "green"
                    : "red",
                borderWidth: activeIndex === index ? 2 : 0,
                borderColor: "#fff",
              },
            ]}
          >
            <Text style={styles.cardIcon}>💰</Text>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardAmount}>
              {item.balance} {item.currency}
            </Text>
          </View>
        )}
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.round(
            ev.nativeEvent.contentOffset.x / (width * 0.7 + 15)
          );
          setActiveIndex(newIndex);
        }}
      />

      {/* Altında transaction listesi */}
      <View style={styles.transactions}>
        <Text style={styles.sectionTitle}>Son İşlemler</Text>

        {!activeAccount ? (
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Yükleniyor...
          </Text>
        ) : activeAccount.transactions?.length === 0 ? (
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Henüz işlem yok
          </Text>
        ) : (
          <FlatList
            data={activeAccount?.transactions || []}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <Text style={styles.transactionTitle}>{item.description}</Text>
                <Text
                  style={
                    item.type === "income"
                      ? styles.transactionAmountPositive
                      : styles.transactionAmountNegative
                  }
                >
                  {item.type === "income" ? "+" : "-"}
                  {item.amount} {activeAccount.currency}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.7,
    height: 200,
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

  transactions: { flex: 1, paddingHorizontal: 20 },
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
  transactionTitle: { color: "#fff" },
  transactionAmountPositive: { color: "#4CAF50", fontWeight: "bold" },
  transactionAmountNegative: { color: "#F44336", fontWeight: "bold" },
  cardChange: { fontSize: 12, fontWeight: "500", color: "white" },
  cardIconWrapper: { marginBottom: 10 },
});
