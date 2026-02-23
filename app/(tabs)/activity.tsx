import { useWallet } from "@/lib/WalletContext";
import TransactionDetail from "@/src/components/TransactionDetails";
import { getTransactions } from "@/src/solana/transactionsHistory";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [selectedTransaction, setSelectedTransaction] =
    useState<transactionData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
      <Text style={s.title}>Activity</Text>

      <View style={s.scrollWrapper}>
        <ScrollView>
          {transactions.length === 0 ? (
            <View style={s.emptyContainer}>
              <Text style={s.emptyText}>
                please wait while we are fetching the transactions
              </Text>
            </View>
          ) : (
            transactions.map((tx, index) => (
              <TouchableOpacity
                key={tx.signature || index}
                onPress={() => {
                  setSelectedTransaction(tx);
                  setModalVisible((p) => !p);
                }}
              >
                <View style={s.card}>
                  <View style={s.leftSection}>
                    <View style={s.imageWrapper}>
                      <Image
                        source={{
                          uri: tx.metadata?.image!,
                        }}
                        style={s.tokenImage}
                      />

                      <View
                        style={[
                          s.arrowBadge,
                          tx.movement === "incoming"
                            ? s.incomingBadge
                            : s.outgoingBadge,
                        ]}
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

                    <View style={s.infoWrapper}>
                      <Text style={s.addressText}>
                        {tx.movement === "incoming"
                          ? `${tx.fromUserAccount?.slice(
                              0,
                              4,
                            )}...${tx.fromUserAccount?.slice(-4)}`
                          : `${tx.toUserAccount?.slice(
                              0,
                              4,
                            )}...${tx.toUserAccount?.slice(-4)}`}
                      </Text>
                      <Text style={s.subText}>
                        {tx.movement === "incoming" ? "Received" : "Sent"} •{" "}
                        {formatDate(tx.timestamp)}
                      </Text>
                    </View>
                  </View>

                  <View style={s.amountSection}>
                    <Text
                      style={[
                        s.amountText,
                        tx.movement === "incoming"
                          ? s.incomingAmount
                          : s.outgoingAmount,
                      ]}
                    >
                      {tx.movement === "incoming"
                        ? `+${tx.amount}`
                        : `-${tx.amount}`}
                    </Text>
                    <Text style={s.symbolText}>
                      {tx.metadata?.symbol || "SOL"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>

      <View>
        {selectedTransaction && (
          <TransactionDetail
            transaction={selectedTransaction}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}
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

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  scrollWrapper: {
    marginTop: 60,
  },

  emptyContainer: {
    alignItems: "center",
  },

  emptyText: {
    color: "#fff",
    maxWidth: 300,
    textAlign: "center",
    fontSize: 16,
  },

  card: {
    padding: 12,
    borderColor: "#1f2837",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#121625",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  imageWrapper: {
    width: 60,
    height: 60,
    position: "relative",
  },

  tokenImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1f2837",
  },

  arrowBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  incomingBadge: {
    backgroundColor: "#0fc534",
  },

  outgoingBadge: {
    backgroundColor: "#ffffff",
  },

  infoWrapper: {
    marginLeft: 12,
  },

  addressText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  subText: {
    color: "#fff",
    opacity: 0.6,
    fontSize: 14,
  },

  amountSection: {
    alignItems: "flex-end",
  },

  amountText: {
    fontWeight: "bold",
    fontSize: 20,
  },

  incomingAmount: {
    color: "#3aee5e",
  },

  outgoingAmount: {
    color: "red",
  },

  symbolText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
});
