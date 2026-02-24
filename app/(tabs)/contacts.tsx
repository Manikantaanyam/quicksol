import { AddContact } from "@/src/components/AddContact";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={s.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
          Contacts
        </Text>
        <AntDesign
          onPress={() => setModalVisible((p) => !p)}
          name="user-add"
          size={18}
          color="#fff"
          style={{
            padding: 12,
            backgroundColor: "#9C46EC",
            borderRadius: 999,
          }}
        />
      </View>

      <View style={s.field}>
        <View style={s.inputWrapper}>
          <Feather name="search" size={20} color="#fff" style={s.icon} />
          <TextInput
            placeholder="Search name or wallet address"
            placeholderTextColor="#6b7280"
            style={s.input}
          />
        </View>
      </View>

      <AddContact
        visible={modalVisible}
        onClose={() => setModalVisible((p) => !p)}
      />
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

  field: {
    gap: 8,
    marginTop: 20,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141A2A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    gap: 12,
  },
  icon: {
    opacity: 0.4,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
});
