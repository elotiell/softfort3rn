const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const { optimism, arbitrum } = require('../config/networks');

// ABI контракта ERC-20
const erc20ABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../contracts/erc20ABI.json')));

// Подключение к сетям
const web3Optimism = new Web3(new Web3.providers.HttpProvider(optimism.rpcUrl));
const web3Arbitrum = new Web3(new Web3.providers.HttpProvider(arbitrum.rpcUrl));

// Контракты токенов
const tokenContractOptimism = new web3Optimism.eth.Contract(erc20ABI, optimism.tokenAddress);
const tokenContractArbitrum = new web3Arbitrum.eth.Contract(erc20ABI, arbitrum.tokenAddress);

// Функция для получения баланса токенов
async function getTokenBalance(web3, tokenContract, accountAddress) {
    const balance = await tokenContract.methods.balanceOf(accountAddress).call();
    return web3.utils.fromWei(balance, 'ether');  // Возвращаем баланс в "читаемом" виде
}

module.exports = { getTokenBalance };
