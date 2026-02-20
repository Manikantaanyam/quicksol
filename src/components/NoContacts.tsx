import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function Contacts() {
  return (
    <View style={s.emptyStateContainer}>
      <AntDesign name="user-add" size={25} color="#fff" style={s.emptyIcon} />
      <Text style={s.emptyText}>
        No contacts yet. Adding contacts makes sending easier.
      </Text>

      <TouchableOpacity style={s.addFirstContactButton}>
        <Text style={s.addFirstContactText}>Add first contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  emptyStateContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1f2837",
    paddingVertical: 32,
    gap: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#6b7380",
    marginTop: 20,
  },
  emptyIcon: {
    padding: 20,
    backgroundColor: "#141A2A",
    borderRadius: 999,
  },
  emptyText: {
    color: "#fff",
    opacity: 0.6,
    maxWidth: 300,
    textAlign: "center",
    lineHeight: 20,
  },
  addFirstContactButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#9ca3af",
    borderRadius: 10,
    marginTop: 10,
  },
  addFirstContactText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
