const { BlockChain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "c3a3165c640953e7db71a2ac39d0697274d215331009bbf57f6753210866cb41"
);

const myWalletAddress = myKey.getPublic("hex");

let rojoCoin = new BlockChain();

rojoCoin.minePendingTransactions(myWalletAddress);

const tx1 = new Transaction(myWalletAddress, "public_key_goes_here", 10);
tx1.signTransaction(myKey);

rojoCoin.addTransaction(tx1);

console.log("\n Starting the miner...");
rojoCoin.minePendingTransactions(myWalletAddress);

console.log(
  "\n Balance of Rohan is",
  rojoCoin.getBalanceOfAddress(myWalletAddress)
);

console.log("Is Chain Valid:", rojoCoin.isChainValid());

rojoCoin.chain[1].transactions[0].amount = 1;

console.log("Is Chain Valid:", rojoCoin.isChainValid());
