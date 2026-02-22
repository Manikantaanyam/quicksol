export default async function getMintMetadata(mintAddresses: string[]) {
  const rpc_url = `https://mainnet.helius-rpc.com/?api-key=${process.env.EXPO_PUBLIC_HELIUS_API_KEY}`;

  const response = await fetch(rpc_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "1",
      method: "getAssetBatch",
      params: {
        ids: mintAddresses,
        options: {
          showUnverifiedCollections: false,
          showCollectionMetadata: false,
          showFungible: false,
          showInscription: false,
        },
      },
    }),
  });

  const { result } = await response.json();
  console.log("result ==> ", result);
  return result;
}
