import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PayScreen() {
  return (
    <SafeAreaView style={s.container}>
      <Text style={{ color: "#fff" }}>PayScreen screen</Text>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
});
