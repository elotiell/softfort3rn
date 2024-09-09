async function checkOptimismBalance(web3, address) {
    const balance = await web3.eth.getBalance(address);
    console.log('Баланс на Optimism Sepolia:', web3.utils.fromWei(balance, 'ether'));
}

module.exports = { checkOptimismBalance };
