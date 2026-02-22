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
      `https://api-mainnet.helius-rpc.com/v0/addresses/${address}/transactions/?api-key=${process.env.EXPO_PUBLIC_HELIUS_API_KEY}&limit=50`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();

    const filtered_transactions = filterPeerToPeerTransactions(data, address);

    const uniqueMintAddresses = new Set(); // unique mint addresses of tokens to fetch metadata
    filtered_transactions.forEach((tx: any) => {
      tx.tokenTransfers?.forEach((t: any) => {
        if (t.mint) {
          uniqueMintAddresses.add(t.mint);
        }
      });
    });

    console.log("mint_Addr => ", uniqueMintAddresses);
    const mintArray: any[] = Array.from(uniqueMintAddresses);
    const mintAddressMetadata = await getMintMetadata(mintArray);
    console.log("mintAddressMetadata ==> ", mintAddressMetadata);

    console.log("filtered_transactions ==> ", filtered_transactions);
    console.log("filtered_transactions_length ==> ", filtered_transactions.length);

    return filtered_transactions;
  } catch (error) {
    console.error("Helius fetch error:", error);
    throw error;
  }
}
