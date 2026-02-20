import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactsScreen() {
  return (
    <SafeAreaView style={s.container}>
      <Text style={{ color: "#fff" }}>Contacts screen</Text>
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
