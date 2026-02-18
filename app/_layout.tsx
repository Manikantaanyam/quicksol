import { WalletProvider } from "@/lib/WalletContext";
import "../src/polyfill";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <WalletProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      
    </WalletProvider>
  );
}
