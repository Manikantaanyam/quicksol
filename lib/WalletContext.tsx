import {
  transact,
  Web3MobileWallet,
} from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { PublicKey } from "@solana/web3.js";
import { createContext, useContext, useState } from "react";

const APP_IDENTITY = {
  name: "quicksol",
  uri: "https://quicksol.com",
  icon: "favicon.png",
};

type WalletContextType = {
  connectWallet: () => Promise<void | string>;
  disconnectWallet: () => Promise<void>;
  publicKey: string | null;
  authToken: string | null;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      const result = await transact(async (wallet: Web3MobileWallet) => {
        return wallet.authorize({
          chain: "solana:devnet",
          identity: APP_IDENTITY,
        });
      });

      setAuthToken(result.auth_token);
      const address = result.accounts[0].address;
      const addressBytes = Uint8Array.from(atob(address), (c) =>
        c.charCodeAt(0),
      );
      const pubKey = new PublicKey(addressBytes);
      const base58Address = pubKey.toBase58();

      setPublicKey(base58Address);
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
      console.log("Error occured while connecting wallet", err);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (!authToken) return;
      await transact(async (wallet: Web3MobileWallet) => {
        await wallet.deauthorize({ auth_token: authToken });
      });

      setAuthToken(null);
      setPublicKey(null);

      console.log("Disconnected successfully");
    } catch (err) {
      console.log("Error occured while disconnecting the wallet", err);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        publicKey,
        authToken,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const conext = useContext(WalletContext);
  if (conext == undefined) {
    throw new Error("useWallet must be used inside WalletProvider");
  }
  return conext;
};
