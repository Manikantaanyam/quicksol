import { useWallet } from "@/lib/WalletContext";
import { Contacts } from "@/src/components/NoContacts";
import { getBalance } from "@/src/solana/balance";
import { getTransactions } from "@/src/solana/transactionsHistory";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { disconnectWallet, publicKey, username } = useWallet();
  const router = useRouter();

  const [bal, setBal] = useState<number | undefined>(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (!publicKey) return;
    async function fetchDataForWallet() {
      try {
        const [balance, transactions] = await Promise.all([
          getBalance(publicKey!),
          getTransactions(publicKey!),
        ]);

        setBal(balance);
        setTransactions(transactions);
      } catch (err) {
        console.log("Error", err);
      }
    }
  }, [publicKey]);

  return (
    <SafeAreaView style={s.container}>
      <View>
        <View style={s.headerRow}>
          <View style={s.profileSection}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>
                {username ? username[0].toUpperCase() : "A"}
              </Text>
            </View>
            <View>
              <Text style={s.username}>
                {username ? username : "No username"}
              </Text>
              <Text style={s.walletAddress}>
                {`${publicKey?.slice(0, 4)}....${publicKey?.slice(-4)}`}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={s.disconnectBtn} onPress={disconnectWallet}>
            <AntDesign name="disconnect" color="#e5e7eb" size={20} />
          </TouchableOpacity>
        </View>

        <View style={s.balanceContainer}>
          <Text style={s.balanceTag}>Total Balance</Text>
          <View style={s.balanceRow}>
            <Text style={s.balance}>{bal ? bal : "12.435"}</Text>
            <Text style={s.solTag}>SOL</Text>
          </View>

          <View style={s.actionRow}>
            <TouchableOpacity style={s.sendButton}>
              <Feather name="send" size={20} color="#fff" />
              <Text style={s.actionText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.receiveButton}>
              <Feather name="download" size={20} color="#fff" />
              <Text style={s.actionText}>Receive</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={s.contactsHeader}>
        <Text style={s.contactsTitle}>Contacts</Text>
        <View style={s.addContactRow}>
          <AntDesign name="user-add" size={20} color="#9C46EC" />
          <Text style={s.addContactText}>Add new</Text>
        </View>
      </View>

      <View>
        <Contacts />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 40,
    backgroundColor: "#0b0f1a",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileSection: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: "#9C46EC",
  },
  avatarText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  username: {
    color: "#fff",
  },
  walletAddress: {
    color: "#9ca3af",
    letterSpacing: 0.5,
  },
  disconnectBtn: {
    backgroundColor: "#141A2A",
    padding: 14,
    borderRadius: 999,
    gap: 10,
    alignSelf: "flex-end",
  },
  balanceContainer: {
    borderWidth: 1,
    borderColor: "#1f2837",
    borderRadius: 30,
    padding: 16,
    paddingVertical: 32,
    marginTop: 40,
    backgroundColor: "#121625",
  },
  balanceTag: {
    color: "#9ca3af",
    fontSize: 18,
    letterSpacing: 0.9,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  balance: {
    fontSize: 38,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  solTag: {
    color: "#f3e8ff",
    fontSize: 20,
    opacity: 0.6,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
  actionRow: {
    marginTop: 30,
    flexDirection: "row",
    gap: 10,
  },
  sendButton: {
    backgroundColor: "#9C46EC",
    width: 150,
    height: 60,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    flexDirection: "row",
    gap: 8,
  },
  receiveButton: {
    backgroundColor: "#292C3B",
    width: 150,
    height: 60,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    flexDirection: "row",
    gap: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  contactsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 16,
  },
  contactsTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  addContactRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addContactText: {
    color: "#9C46EC",
    fontSize: 16,
    fontWeight: "600",
  },
});
