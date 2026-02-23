import { AntDesign, Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TransactionDetail({
  transaction,
  visible,
  onClose,
}: {
  transaction: any;
  visible: boolean;
  onClose: () => void;
}) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    return date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Entypo
              name="chevron-left"
              color="#fff"
              size={28}
              onPress={onClose}
            />
            <Text style={styles.title}>Transaction Details</Text>
            <View style={{ width: 28 }} />
          </View>

          <Image
            source={{ uri: transaction.metadata.image }}
            style={styles.image}
          />

          <Text
            style={[
              styles.amount,
              {
                color:
                  transaction.movement === "incoming" ? "#0fc534" : "#ff4d4f",
              },
            ]}
          >
            {transaction.movement === "incoming"
              ? `+${transaction.amount} ${transaction.metadata.symbol}`
              : `-${transaction.amount} ${transaction.metadata.symbol}`}
          </Text>

          <View style={styles.detailsBox}>
            <View style={styles.row}>
              <Text style={styles.label}>
                {transaction.movement === "incoming" ? "From" : "To"}
              </Text>
              <View style={styles.valueContainer}>
                <Text style={styles.boldText}>
                  {transaction.movement === "incoming" ? "Sender" : "Recipient"}
                </Text>
                <View
                  style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                >
                  <Text style={styles.valueText}>
                    {transaction.movement === "incoming"
                      ? `${transaction.fromUserAccount?.slice(
                          0,
                          8,
                        )}...${transaction.fromUserAccount?.slice(-8)}`
                      : `${transaction.toUserAccount?.slice(
                          0,
                          8,
                        )}...${transaction.toUserAccount?.slice(-8)}`}
                  </Text>
                  <FontAwesome6 name="copy" size={14} color="#8f9bb3" />
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Timestamp</Text>
              <View
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <AntDesign name="clock-circle" size={14} color="#8f9bb3" />
                <Text style={styles.valueText}>
                  {formatDate(transaction.timestamp)}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Signature</Text>
              <Text style={styles.signatureText}>
                {`${transaction.signature.slice(
                  0,
                  8,
                )}...${transaction.signature.slice(-8)}`}
              </Text>
            </View>

            <View style={styles.lastRow}>
              <Text style={styles.label}>Network Fee</Text>
              <Text style={styles.valueText}>{transaction.networkFee} SOL</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const url = `https://explorer.solana.com/tx/${transaction.signature}?cluster=mainnet`;
                Linking.openURL(url);
              }}
            >
              <Feather name="external-link" size={24} color="#fff" />
              <Text style={styles.buttonText}>View on solana explorer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#0b0f1a",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    minHeight: "90%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 999,
    alignSelf: "center",
    marginTop: 40,
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 24,
  },
  detailsBox: {
    marginTop: 32,
    backgroundColor: "#121625",
    borderRadius: 16,
    padding: 16,
    gap: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 14,
    borderBottomWidth: 0.6,
    borderBottomColor: "#1f2837",
  },
  lastRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#8f9bb3",
    fontSize: 14,
  },
  valueContainer: {
    alignItems: "flex-end",
    maxWidth: "65%",
  },
  boldText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  valueText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 2,
  },
  signatureText: {
    color: "#9C46EC",
    fontSize: 14,
    marginTop: 2,
  },
  button: {
    marginTop: 40,
    backgroundColor: "#121625",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
