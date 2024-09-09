module.exports = {
    arbitrum: {
        rpcUrl: 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
        chainId: 421611  // Chain ID для Arbitrum Sepolia
    },
    optimism: {
        rpcUrl: 'https://sepolia.optimism.io',
        chainId: 420  // Chain ID для Optimism Sepolia
    },
    wallet: {
        address: process.env.WALLET_ADDRESS,  // Адрес кошелька
        privateKey: process.env.PRIVATE_KEY   // Приватный ключ
    }
};
