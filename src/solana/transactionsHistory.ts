export async function getTransactions(address: string) {
  try {
    const response = await fetch(
      `https://api-devnet.helius-rpc.com/v0/addresses/${address}/transactions/?api-key=${process.env.EXPO_PUBLIC_HELIUS_API_KEY}&limit=10`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();

    console.log("data", data);

    return data;
  } catch (error) {
    console.error("Helius fetch error:", error);
    throw error;
  }
}
