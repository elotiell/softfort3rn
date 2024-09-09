module.exports = {
    arbitrum: {
        rpcUrl: 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
        chainId: 421611  
    },
    optimism: {
        rpcUrl: 'https://sepolia.optimism.io',
        chainId: 420  
    },
    wallet: {
        address: process.env.WALLET_ADDRESS,  
        privateKey: process.env.PRIVATE_KEY   
    }
};
