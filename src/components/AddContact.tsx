import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function AddContact({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Entypo name="chevron-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Add Contact</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>name</Text>
              <View style={styles.inputWrapper}>
                <Feather
                  name="user"
                  size={22}
                  color="#fff"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="e.g. John Doe"
                  placeholderTextColor="#6b7280"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>solana wallet address</Text>
              <View style={styles.inputWrapper}>
                <Feather
                  name="link"
                  size={22}
                  color="#fff"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter the wallet address"
                  placeholderTextColor="#6b7280"
                  style={styles.input}
                />
              </View>
            </View>
          </View>

          <View style={styles.tipBox}>
            <View style={styles.tipHeader}>
              <AntDesign name="check-circle" size={22} color="#7d22ce" />
              <Text style={styles.tipTitle}>Tip</Text>
            </View>
            <Text style={styles.tipText}>
              Adding a contact will make sending SOL easier. You can send SOL or
              tokens without pasting long addresses or remembering them.
            </Text>
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Save Contact</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0b0f1a",
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    maxWidth: 600,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "#141A2A",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  form: {
    marginTop: 40,
    gap: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    color: "#fff",
    textTransform: "uppercase",
    opacity: 0.4,
    letterSpacing: 0.8,
    fontSize: 12,
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
  tipBox: {
    marginTop: 50,
    paddingVertical: 24,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#141A2A",
    borderWidth: 0.5,
    borderColor: "#3a0764",
    gap: 12,
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  tipTitle: {
    color: "#7d22ce",
    fontSize: 18,
    fontWeight: "700",
  },
  tipText: {
    color: "#fff",
    opacity: 0.6,
    lineHeight: 20,
    fontSize: 14,
  },
  saveButton: {
    marginTop: "auto",
    backgroundColor: "#9C46EC",
    paddingVertical: 18,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
