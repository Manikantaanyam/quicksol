import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SuggestContact() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Feather name="users" size={30} color="#a755f7" />
        </View>

        <Text style={styles.title}>Save Contact?</Text>

        <Text style={styles.description}>
          You've interacted with this
          <Text style={styles.address}> 9ajd...L29d</Text> address 3 times. Want
          to add them as a contact?
        </Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Yes, Add Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Not now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: "100%",
  },
  card: {
    borderColor: "#bf84fc",
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 28,
    backgroundColor: "#0b0f1a",
    borderRadius: 20,
    gap: 10,
  },
  iconWrapper: {
    borderWidth: 1,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3a0764",
    borderRadius: 15,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  description: {
    color: "#fff",
    opacity: 0.6,
    textAlign: "center",
  },
  address: {
    color: "#bf84fc",
  },
  buttonGroup: {
    width: "100%",
    gap: 10,
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: "#9C46EC",
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#4b5463",
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  secondaryButtonText: {
    color: "#fff",
    opacity: 0.6,
    fontWeight: "bold",
  },
});
