import { useWallet } from "@/lib/WalletContext";
import { getBalance } from "@/src/solana/balance";
import { getTransactions } from "@/src/solana/transactionsHistory";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { connectWallet, disconnectWallet, publicKey, authToken } = useWallet();

  const [bal, setBal] = useState<number | undefined>(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  console.log("Address", publicKey);
  console.log("authtoken", authToken);

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
        console.log("transactions", transactions);
      } catch (err) {
        console.log("Error", err);
      }
    }
    // fetchDataForWallet();
  }, [publicKey]);

  // if (!authToken) {
  //   return (
  //     <View style={s.emptyState}>
  //       <TouchableOpacity style={s.connectBtn} onPress={connectWallet}>
  //         <Text style={s.btnText}>Connect</Text>
  //       </TouchableOpacity>
  //       <Text style={s.subHeading}>
  //         Connect your wallet to add contacts and send sol
  //       </Text>
  //     </View>
  //   );
  // }

  return (
    <View style={s.container}>
      <TouchableOpacity style={s.disconnectBtn} onPress={disconnectWallet}>
        <Text
          style={s.btnText}
        >{`${publicKey?.slice(0, 4)}....${publicKey?.slice(-4)}`}</Text>
        <AntDesign name="disconnect" color="#fff" size={20} />
      </TouchableOpacity>

      <View style={s.balanceContainer}>
        <Text style={s.balanceTag}>SOL BALANCE</Text>
        <Text style={s.balance}>{bal}</Text>
        <Text style={s.solTag}>SOL</Text>
        <Text
          style={s.publickey}
        >{`${publicKey?.slice(0, 8)}....${publicKey?.slice(-8)}`}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 40,
    backgroundColor: "#000",
  },
  connectBtn: {
    backgroundColor: "#1d6ff3",
    padding: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  disconnectBtn: {
    backgroundColor: "#37b825",
    padding: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    alignSelf: "flex-end",
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    letterSpacing: 0.8,
  },
  subHeading: {
    marginTop: 10,
    opacity: 0.6,
    maxWidth: 250,
    textAlign: "center",
  },
  balanceContainer: {
    borderWidth: 1,
    borderColor: "#e2fbdd",
    borderRadius: 30,
    padding: 16,
    paddingVertical: 32,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  balanceTag: {
    color: "#c4f5bd",
    fontSize: 18,
    letterSpacing: 0.9,
  },
  balance: {
    fontSize: 38,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  solTag: {
    color: "#c4f5bd",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1.2,
    marginTop: 10,
  },
  publickey: {
    color: "#247d18",
    letterSpacing: 1.2,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 4,
    paddingHorizontal: 10,
    backgroundColor: "#f2fdf0",
    fontWeight: "bold",
    borderRadius: 10,
    marginTop: 10,
  },
});
