import { WalletProvider } from "@/lib/WalletContext";
import "../src/polyfill";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <WalletProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </WalletProvider>
  );
}
