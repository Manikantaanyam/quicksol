import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function UserName() {
  const [userName, setUserName] = useState<string | null>(null);

  return (
    <SafeAreaView style={s.container}>
      <Text style={s.title}>Create username</Text>

      <Text style={s.subtitle}>
        Your contacts will be saved on Solana and accessible from any wallet.
      </Text>

      <View style={s.inputGroup}>
        <Text style={s.label}>Username</Text>
        <TextInput
          onChangeText={setUserName}
          placeholder="@ your username"
          placeholderTextColor="#6b7280"
          style={s.input}
        />
      </View>

      <View style={s.buttonGroup}>
        <TouchableOpacity style={s.primaryButton}>
          <Text style={s.primaryButtonText}>Create username</Text>
        </TouchableOpacity>

        <Link href="/">
          <TouchableOpacity style={s.secondaryButton}>
            <Text style={s.secondaryButtonText}>I'll do this later</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={s.infoCard}>
        <View style={s.infoIconWrapper}>
          <AntDesign name="user-add" size={22} color="#9333EA" />
        </View>

        <View style={s.infoContent}>
          <Text style={s.infoTitle}>Why have a username?</Text>

          <Text style={s.infoItem}>• Access contacts from any wallet</Text>
          <Text style={s.infoItem}>• Restore your contacts anytime</Text>
          <Text style={s.infoItem}>• Share your contact list easily</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f1a",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 16,
    textAlign: "center",
    opacity: 0.8,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: "#fff",
    marginBottom: 10,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#283352",
    backgroundColor: "#121625",
    padding: 18,
    paddingHorizontal: 25,
    borderRadius: 14,
    color: "#fff",
    fontSize: 16,
  },
  buttonGroup: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: "#9333EA",
    paddingVertical: 18,
    borderRadius: 14,
    width: "100%",
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 0.8,
    fontSize: 16,
  },
  secondaryButton: {
    paddingVertical: 18,
    borderRadius: 14,
    width: "100%",
  },
  secondaryButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 0.8,
    opacity: 0.6,
    fontSize: 15,
  },
  infoCard: {
    backgroundColor: "#121625",
    borderWidth: 1,
    borderColor: "#1f2837",
    padding: 20,
    flexDirection: "row",
    gap: 16,
    alignItems: "flex-start",
    borderRadius: 20,
  },
  infoIconWrapper: {
    backgroundColor: "#2a0e4d",
    padding: 12,
    borderRadius: 999,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  infoItem: {
    color: "#cbd5e1",
    opacity: 0.85,
    marginBottom: 4,
    fontSize: 14,
  },
});
