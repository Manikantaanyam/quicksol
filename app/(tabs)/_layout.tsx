import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: "#000",
        },
        tabBarActiveTintColor: "#60da4e",
        tabBarInactiveTintColor: "#f2fdf0",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="pay"
        options={{
          title: "pay",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="send" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: "history",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="history" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
