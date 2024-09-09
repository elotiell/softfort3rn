const { wallet } = require('../config/networks');

// Подписываем и отправляем транзакцию
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

module.exports = { sendSignedTransaction };
