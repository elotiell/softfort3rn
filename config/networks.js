module.exports = {
    optimism: {
        rpcUrl: 'https://sepolia.optimism.io/v3/YOUR_INFURA_PROJECT_ID',
        tokenAddress: 'OPTIMISM_TOKEN_ADDRESS'
    },
    arbitrum: {
        rpcUrl: 'https://sepolia.arbitrum.io/v3/YOUR_INFURA_PROJECT_ID',
        tokenAddress: 'ARBITRUM_TOKEN_ADDRESS'
    },
    wallet: {
        address: process.env.WALLET_ADDRESS,  // Адрес кошелька, подтягиваем из .env
        privateKey: process.env.PRIVATE_KEY   // Приватный ключ, подтягиваем из .env
    }
};
