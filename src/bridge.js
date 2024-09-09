const Web3 = require('web3');
const { arbitrum, optimism, wallet } = require('../config/networks');
const { sendSignedTransaction } = require('./transaction');

// Провайдеры сетей
const web3Arbitrum = new Web3(new Web3.providers.HttpProvider(arbitrum.rpcUrl));
const web3Optimism = new Web3(new Web3.providers.HttpProvider(optimism.rpcUrl));

async function bridgeEthToOptimism(amount) {
    const account = web3Arbitrum.eth.accounts.privateKeyToAccount(wallet.privateKey);
    const nonce = await web3Arbitrum.eth.getTransactionCount(account.address, 'latest');

    // Транзакция для отправки ETH на Optimism через Arbitrum Gateway
    const tx = {
        from: account.address,
        to: '0x4200000000000000000000000000000000000010',  // Адрес Gateway для Optimism на Sepolia
        value: web3Arbitrum.utils.toWei(amount.toString(), 'ether'),  // Количество ETH для отправки
        gas: 2000000,
        nonce: nonce,
        chainId: arbitrum.chainId  // Chain ID для Arbitrum Sepolia
    };

    console.log(`Отправка ${amount} ETH из Arbitrum Sepolia в Optimism Sepolia...`);
    
    // Подписываем и отправляем транзакцию
    const receipt = await sendSignedTransaction(web3Arbitrum, tx);
    console.log('Транзакция подтверждена:', receipt);
}

async function main() {
    const amountToBridge = 0.1;  // Например, бридж 0.1 ETH
    await bridgeEthToOptimism(amountToBridge);

    console.log('Теперь отслеживай баланс на Optimism');
}

main().catch(console.error);
