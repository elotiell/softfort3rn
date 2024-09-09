const Web3 = require('web3');
require('dotenv').config();
const { arbitrum, optimism, wallet } = require('../config/networks');

const web3Arbitrum = new Web3(new Web3.providers.HttpProvider(arbitrum.rpcUrl));
const web3Optimism = new Web3(new Web3.providers.HttpProvider(optimism.rpcUrl));

const arbitrumContract = new web3Arbitrum.eth.Contract([
    // Определите ABI для контракта Arbitrum
], '0x8D86c3573928CE125f9b2df59918c383aa2B514D');

const optimismContract = new web3Optimism.eth.Contract([
    // Определите ABI для контракта Optimism
], '0xF221750e52aA080835d2957F2Eed0d5d7dDD8C38');

async function bridgeEth(amount) {
    const account = web3Arbitrum.eth.accounts.privateKeyToAccount(wallet.privateKey);
    const nonce = await web3Arbitrum.eth.getTransactionCount(account.address, 'latest');

    const tx = {
        from: account.address,
        to: '0x8D86c3573928CE125f9b2df59918c383aa2B514D',  // Контракт Arbitrum
        data: arbitrumContract.methods.bridgeMethod(amount).encodeABI(),  // Замените метод и параметры
        gas: 2000000,
        nonce: nonce,
        chainId: arbitrum.chainId
    };

    console.log(`Отправка ${amount} ETH через Arbitrum контракт...`);
    await sendSignedTransaction(web3Arbitrum, tx);
    
    // Подожди завершения бриджа, затем проверь баланс на Optimism
    setTimeout(async () => {
        const balance = await web3Optimism.eth.getBalance(wallet.address);
        console.log('Баланс на Optimism после бриджа:', web3Optimism.utils.fromWei(balance, 'ether'));
    }, 5 * 60 * 1000);  // Подождать 5 минут
}

async function sendSignedTransaction(web3, tx) {
    const signedTx = await web3.eth.accounts.signTransaction(tx, wallet.privateKey);
    return web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .on('receipt', (receipt) => {
            console.log('Транзакция подтверждена:', receipt);
        })
        .on('error', (error) => {
            console.error('Ошибка при отправке транзакции:', error);
        });
}

module.exports = { bridgeEth };
