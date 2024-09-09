const Web3 = require('web3');
const { getTokenBalance } = require('./token');
const { sendSignedTransaction } = require('./transaction');
const { optimism, wallet } = require('../config/networks');

// Подключение к сети Optimism
const web3Optimism = new Web3(new Web3.providers.HttpProvider(optimism.rpcUrl));

// Бриджинг токенов
async function bridgeTokens(amount) {
    const nonce = await web3Optimism.eth.getTransactionCount(wallet.address, 'latest');
    
    const tx = {
        from: wallet.address,
        to: optimism.tokenAddress,  // Это контракт токена, можно заменить на адрес бриджа
        nonce: nonce,
        gas: 500000,
        data: ''  // В зависимости от бриджа сюда пойдет encodeABI метода для бриджинга
    };

    // Отправляем подписанную транзакцию
    await sendSignedTransaction(web3Optimism, tx);
}

// Главная функция, которая запускает бридж
async function main() {
    try {
        // Получаем баланс перед бриджингом
        const balance = await getTokenBalance(web3Optimism, optimism.tokenAddress, wallet.address);
        console.log('Текущий баланс на Optimism:', balance);

        // Бридж токенов
        const amountToBridge = Web3.utils.toWei('1', 'ether');  // Примерно 1 токен для бриджинга
        await bridgeTokens(amountToBridge);

    } catch (error) {
        console.error('Ошибка при бридже:', error);
    }
}

main();
