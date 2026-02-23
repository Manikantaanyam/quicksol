type transactionData = {
  movement: "incoming" | "outgoing";
  fromUserAccount: string;
  toUserAccount: string;
  signature: string;
  asset: string;
  amount: number;
  metadata: Metadata | null;
  networkFee: number;
  timestamp: number;
};

type Metadata = {
  image: string | null;
  symbol: string | null;
  decimals: number;
};

interface interactedAddressesType {
  address: string;
  total: number;
  incoming: number;
  outgoing: number;
  lastInteraction: number;
}

// for getting most interacted addresses to show them to user and advice him to create contacts for those
export default function getTopInteractedAddresses(
  transactions: transactionData[],
  limit: number,
) {
  if (!transactions || transactions.length === 0) return;

  const interactedAddresses: Record<string, interactedAddressesType> = {};

  for (const tx of transactions) {
    if (!tx) continue;

    const otherAddress =
      tx.movement === "incoming" ? tx.fromUserAccount : tx.toUserAccount;

    if (!interactedAddresses[otherAddress]) {
      interactedAddresses[otherAddress] = {
        address: otherAddress,
        total: 0,
        incoming: 0,
        outgoing: 0,
        lastInteraction: 0,
      };
    }

    interactedAddresses[otherAddress].total += 1;

    tx.movement === "incoming"
      ? (interactedAddresses[otherAddress].incoming += 1)
      : (interactedAddresses[otherAddress].outgoing += 1);

    if (tx.timestamp > interactedAddresses[otherAddress].lastInteraction) {
      interactedAddresses[otherAddress].lastInteraction = tx.timestamp;
    }
  }

  return Object.values(interactedAddresses)
    .sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return b.lastInteraction - a.lastInteraction;
    })
    .slice(0, limit)
    .filter((t) => t.total >= 2);
}
