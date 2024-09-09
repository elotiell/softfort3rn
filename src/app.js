const { bridgeEth } = require('./t1rnBridge');

async function main() {
    // Бриджинг 0.1 ETH через T1RN Bridge
    await bridgeEth(0.1);
}

main().catch(console.error);
