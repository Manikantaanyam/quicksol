import { useWallet } from "@/lib/WalletContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Auth() {
  const { connectWallet } = useWallet();

  return (
    <View style={s.emptyState}>
      <Text style={s.heading}>Connect your Solana wallet</Text>

      <Text style={s.subHeading}>
        Send tokens to your friends using their names instead of long addresses.
      </Text>

      <TouchableOpacity style={s.connectBtn} onPress={connectWallet}>
        <Text style={s.btnText}>Connect</Text>
      </TouchableOpacity>

      <View style={s.safeTagContainer}>
        <Ionicons
          style={{ opacity: 0.4 }}
          name="shield-checkmark"
          color="#fff"
          size={25}
        />
        <Text style={s.paragraphTxt}>Safe & Non Custodial connection</Text>
      </View>

      <Text style={s.termsText}>
        By Connecting to the wallet, you agree to our Terms Of Service and
        Privacy Policy
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0b0f1a",
    paddingHorizontal: 16,
    gap: 20,
  },
  connectBtn: {
    backgroundColor: "#9333EA",
    padding: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "flex-start",
    width: "100%",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    maxWidth: 350,
    alignSelf: "flex-start",
  },
  subHeading: {
    opacity: 0.6,
    maxWidth: 350,
    color: "#cbd6ec",
    alignSelf: "flex-start",
    fontSize: 17,
  },
  safeTagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    alignItems: "center",
    marginTop: 50,
  },
  paragraphTxt: {
    color: "#fff",
    opacity: 0.4,
    textAlign: "center",
  },
  termsText: {
    color: "#fff",
    opacity: 0.4,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
