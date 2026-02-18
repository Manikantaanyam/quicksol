import { PublicKey } from "@solana/web3.js";
import { connection } from "./connection";

export async function getBalance(publicKey: string) {
  const balance = await connection.getBalance(new PublicKey(publicKey));

  return balance / 1e9;
}
