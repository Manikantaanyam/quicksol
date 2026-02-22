import getMintMetadata from "./mintMetadata";

function hasMultipleUserMovements(tx: any) {
  const uniqueUsers = new Set();

  tx.nativeTransfers?.forEach((t: any) => {
    uniqueUsers.add(t.fromUserAccount);
    uniqueUsers.add(t.toUserAccount);
  });

  tx.tokenTransfers?.forEach((t: any) => {
    uniqueUsers.add(t.fromUserAccount);
    uniqueUsers.add(t.toUserAccount);
  });

  return uniqueUsers.size !== 2;
}

function isSimpleNativeTransfer(tx: any) {
  if (!tx.nativeTransfers || tx.nativeTransfers.length !== 1) {
    return false;
  }
  if (tx.tokenTransfers && tx.tokenTransfers.length > 0) {
    return false;
  }
  return true;
}

function isSimpleTokenTransfer(tx: any) {
  if (!tx.tokenTransfers || tx.tokenTransfers.length !== 1) {
    return false;
  }
  return true;
}

function extractCounterparty(tx: any, walletAddress: any) {
  const native = tx.nativeTransfers?.[0];
  const token = tx.tokenTransfers?.[0];

  if (native) {
    if (native.fromUserAccount === walletAddress) return native.toUserAccount;
    if (native.toUserAccount === walletAddress) return native.fromUserAccount;
  }

  if (token) {
    if (token.fromUserAccount === walletAddress) return token.toUserAccount;
    if (token.toUserAccount === walletAddress) return token.fromUserAccount;
  }

  return null;
}

function filterPeerToPeerTransactions(transactions: any, walletAddress: any) {
  return transactions.filter((tx: any) => {
    if (tx.type !== "TRANSFER") return false;

    const isNative = isSimpleNativeTransfer(tx);
    const isToken = isSimpleTokenTransfer(tx);

    if (!isNative && !isToken) return false;

    if (hasMultipleUserMovements(tx)) return false;

    const counterparty = extractCounterparty(tx, walletAddress);

    if (!counterparty) return false;
    if (counterparty === walletAddress) return false;

    return true;
  });
}

export async function getTransactions(address: string) {
  try {
    const response = await fetch(
      `https://api-mainnet.helius-rpc.com/v0/addresses/${address}/transactions/?api-key=${process.env.EXPO_PUBLIC_HELIUS_API_KEY}&limit=80`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    console.log("data ==> ", data);

    const filteredTransactions = filterPeerToPeerTransactions(data, address);

    const uniqueMintAddresses = new Set<string>();

    filteredTransactions.forEach((tx: any) => {
      tx.tokenTransfers?.forEach((t: any) => {
        if (t.mint) uniqueMintAddresses.add(t.mint);
      });
    });

    const mintArray = Array.from(uniqueMintAddresses);

    let metadataMap: Record<string, any> = {};

    if (mintArray.length > 0) {
      const mintMetadata = await getMintMetadata(mintArray);

      mintMetadata.forEach((asset: any) => {
        const mint = asset.id;

        metadataMap[mint] = {
          image: asset?.content?.links?.image || null,
          symbol: asset?.content?.metadata?.symbol || null,
          decimals: asset?.token_info?.decimals ?? null,
        };
      });
    }

    const SOL_METADATA = {
      image:
        "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
      symbol: "SOL",
      decimals: 9,
    };

    const simplifiedTransactions = filteredTransactions.map((tx: any) => {
      const native = tx.nativeTransfers?.[0];
      const token = tx.tokenTransfers?.[0];

      const transfer = native || token;

      const isIncoming = transfer.toUserAccount === address;

      const baseData = {
        movement: isIncoming ? "incoming" : "outgoing",
        fromUserAccount: transfer.fromUserAccount,
        toUserAccount: transfer.toUserAccount,
        signature: tx.signature,
        timestamp: tx.timestamp,
        networkFee: Number(tx.fee) / 1e9,
      };

      if (native) {
        const lamports = native.amount;
        const solAmount = lamports / 1_000_000_000;
        return {
          ...baseData,
          asset: "SOL",
          amount: solAmount,
          metadata: SOL_METADATA,
        };
      }

      if (token) {
        const mint = token.mint;
        const tokenAmount = token.tokenAmount;

        return {
          ...baseData,
          asset: token.mint,
          amount: tokenAmount,
          metadata: metadataMap[token.mint] || null,
        };
      }

      return null;
    });

    console.log("simplified transactions => ", simplifiedTransactions);
    console.log(
      "simplified transactions length => ",
      simplifiedTransactions.length,
    );

    return simplifiedTransactions.filter(Boolean);
  } catch (error) {
    console.error("Helius fetch error:", error);
    throw error;
  }
}
