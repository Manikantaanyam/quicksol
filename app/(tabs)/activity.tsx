import { useWallet } from "@/lib/WalletContext";
import { getTransactions } from "@/src/solana/transactionsHistory";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

type transactionData = {
  movement: "incoming" | "outgoing";
  fromUserAccount: string;
  toUserAccount: string;
  signature: string;
  asset: string;
  amount: number;
  metadata: Metadata | null;
  networkFee: number;
  timestamp: number;
};

type Metadata = {
  image: string | null;
  symbol: string | null;
  decimals: number;
};

export default function ActivityScreen() {
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState<transactionData[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      if (!publicKey) return;
      const data = await getTransactions(publicKey);
      setTransactions(data);
    }

    fetchTransactions();
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <SafeAreaView style={s.container}>
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
        Activity
      </Text>

      <View style={{ marginTop: 60 }}>
        <ScrollView>
          {transactions.length === 0 ? (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  maxWidth: 300,
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                please wait while we are fetching the transactions
              </Text>
            </View>
          ) : (
            transactions.map((tx, index) => (
              <View
                key={tx.signature || index}
                style={{
                  padding: 12,
                  borderColor: "#1f2837",
                  borderWidth: 1,
                  borderRadius: 20,
                  backgroundColor: "#121625",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 60, height: 60, position: "relative" }}>
                    <Image
                      source={{
                        uri: tx.metadata?.image!,
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: "#1f2837",
                      }}
                    />

                    <View
                      style={{
                        position: "absolute",
                        bottom: -2,
                        right: -2,
                        backgroundColor:
                          tx.movement === "incoming" ? "#0fc534" : "#ffffff",
                        width: 22,
                        height: 22,
                        borderRadius: 11,
                        borderWidth: 2,
                        borderColor: "#000",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1,
                      }}
                    >
                      <Feather
                        name={
                          tx.movement === "incoming"
                            ? "arrow-down-left"
                            : "arrow-up-right"
                        }
                        size={16}
                        color={tx.movement === "incoming" ? "white" : "black"}
                      />
                    </View>
                  </View>

                  <View style={{ marginLeft: 12 }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {tx.movement === "incoming"
                        ? `${tx.fromUserAccount?.slice(0, 4)}...${tx.fromUserAccount?.slice(-4)}`
                        : `${tx.toUserAccount?.slice(0, 4)}...${tx.toUserAccount?.slice(-4)}`}
                    </Text>
                    <Text style={{ color: "#fff", opacity: 0.6, fontSize: 14 }}>
                      {tx.movement === "incoming" ? "Received" : "Sent"}  •  {""}
                      {formatDate(tx.timestamp)}
                    </Text>
                  </View>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={{
                      color: `${tx.movement === "incoming" ? "#3aee5e" : "red"}`,
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    {tx.movement === "incoming"
                      ? `+${tx.amount}`
                      : `-${tx.amount}`}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    {tx.metadata?.symbol || "SOL"}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f1a",
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
});
