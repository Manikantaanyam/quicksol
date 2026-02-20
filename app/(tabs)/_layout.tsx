import { useWallet } from "@/lib/WalletContext";
import { UserName } from "@/src/components/UserName";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  const { publicKey, username, hasSkippedUsername } = useWallet();

  if (!publicKey) {
    return <Redirect href="/auth" />;
  }

  if (publicKey && !username && !hasSkippedUsername) {
    return (
      <>
        <UserName />
      </>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: "#0b0f1a",
        },
        tabBarActiveTintColor: "#9C46EC",
        tabBarInactiveTintColor: "#94969E",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                marginTop: 4,
                color: focused ? "#fff" : "#94969E",
                fontSize: 12,
              }}
            >
              Home
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="pay"
        options={{
          title: "Pay",
          tabBarIcon: ({ color, size }) => (
            <Feather name="send" size={size} color={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                marginTop: 4,
                color: focused ? "#fff" : "#94969E",
                fontSize: 12,
              }}
            >
              Send
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user-add" size={size} color={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                marginTop: 4,
                color: focused ? "#fff" : "#94969E",
                fontSize: 12,
              }}
            >
              Contacts
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="history" color={color} size={size} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                marginTop: 4,
                color: focused ? "#fff" : "#94969E",
                fontSize: 12,
              }}
            >
              History
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
