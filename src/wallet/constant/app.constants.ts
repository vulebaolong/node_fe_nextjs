export const BLOCK_CHAIN = {
   MAIN_NET: {
      CONTRACT_DEPOSIT: `0x0aa4F4fA5d3839C6aBFDb1737cFde7914304D543`,
      TOKEN_ARB: {
         address: `0x912CE59144191C1204E64559FE8253a0e49E6548`,
         symbol: `ARB`,
      },
      CHAIN_BSC: {
         chainId: "0x38",
         chainIdNumber: 56,
         chainName: "Binance Smart Chain Mainnet",
         nativeCurrency: {
            name: "Binance Chain Native Token",
            symbol: "BNB",
            decimals: 18,
         },
         rpcUrls: [
            "https://bsc-dataseed1.binance.org/",
            "https://bsc-dataseed2.binance.org/",
            "https://bsc-dataseed3.binance.org/",
            "https://bsc-dataseed4.binance.org/",
            "https://bsc-dataseed1.defibit.io/",
            "https://bsc-dataseed2.defibit.io/",
            "https://bsc-dataseed3.defibit.io/",
            "https://bsc-dataseed4.defibit.io/",
            "https://bsc-dataseed1.ninicoin.io/",
            "https://bsc-dataseed2.ninicoin.io/",
            "https://bsc-dataseed3.ninicoin.io/",
            "https://bsc-dataseed4.ninicoin.io/",
         ],
         blockExplorerUrls: ["https://bscscan.com"],
      },
      CHAIN_ARBITRUM: {
         chainId: "0xa4b1",
         chainIdNumber: 42161,
         chainName: "Arbitrum Mainnet",
         nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
         },
         rpcUrls: ["https://nameless-convincing-fire.arbitrum-mainnet.quiknode.pro/335b14f85eee7d580f4f16d2e15b5d9f2d80dd85/"],
         blockExplorerUrls: ["https://arbiscan.io/"],
      },
   },

   TEST_NET: {
      CONTRACT_DEPOSIT: `0x5300e0C8748370Fd473cF6750C176Bd30beaEa1B`,
      TOKEN_ARB: {
         address: `0x29d706519346825c0b6E774C270692Db1a9d5688`,
         symbol: `ARB`,
      },
      CHAIN_BSC: {
         chainId: "0x61",
         chainIdNumber: 97,
         chainName: "Binance Smart Chain Testnet",
         nativeCurrency: {
            name: "Binance Smart Chain Testnet",
            symbol: "tBNB",
            decimals: 18,
         },
         rpcUrls: [
            "https://data-seed-prebsc-1-s1.binance.org:8545",
            "https://data-seed-prebsc-2-s1.binance.org:8545",
            "https://data-seed-prebsc-1-s2.binance.org:8545",
            "https://data-seed-prebsc-2-s2.binance.org:8545",
            "https://data-seed-prebsc-1-s3.binance.org:8545",
            "https://data-seed-prebsc-2-s3.binance.org:8545",
         ],
         blockExplorerUrls: ["https://testnet.bscscan.com"],
      },
      CHAIN_ARBITRUM: {
         chainId: "0x66eee",
         chainIdNumber: 421614,
         chainName: "Arbitrum Sepolia Testnet",
         nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
         },
         rpcUrls: ["https://misty-evocative-glitter.arbitrum-sepolia.quiknode.pro/c561abaad1be4d0ddb495263b2a672bcabc236f9/"],
         blockExplorerUrls: ["https://sepolia.arbiscan.io/"],
      },
   },
};
