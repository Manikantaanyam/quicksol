import { useWallet } from "@/lib/WalletContext";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { connectWallet, disconnectWallet, publicKey, getBalance, authToken } =
    useWallet();

  const [bal, setBal] = useState<number | undefined>(0);

  console.log("Address", publicKey);
  console.log("authtoken", authToken);

  useEffect(() => {
    if (!authToken) return;
    async function balanceChecker() {
      try {
        const balance = await getBalance();
        setBal(balance);
      } catch (err) {
        console.log("Error", err);
      }
    }
    balanceChecker();
  }, [authToken]);

  if (!authToken) {
    return (
      <View style={s.emptyState}>
        <TouchableOpacity style={s.connectBtn} onPress={connectWallet}>
          <Text style={s.btnText}>Connect</Text>
        </TouchableOpacity>
        <Text style={s.subHeading}>
          Connect your wallet to add contacts and send sol
        </Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <TouchableOpacity style={s.disconnectBtn} onPress={disconnectWallet}>
        <Text style={s.btnText}>Disconnect</Text>
      </TouchableOpacity>

      <View>
        <Text>sol balance : {bal}</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  connectBtn: {
    backgroundColor: "#1d6ff3",
    padding: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  disconnectBtn: {
    backgroundColor: "red",
    padding: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    maxWidth: 120,
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    letterSpacing: 0.8,
    textAlign: "center",
  },
  subHeading: {
    marginTop: 10,
    opacity: 0.6,
    maxWidth: 250,
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },
});
