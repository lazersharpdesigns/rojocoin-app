const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, new Date().getTime(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const previousBlock = this.chain[i - 1];
      const currentBlock = this.chain[i];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

let RojoChain = new BlockChain();
RojoChain.addBlock(new Block(1, new Date().getTime(), { amount: 3 }));
RojoChain.addBlock(new Block(2, new Date().getTime(), { amount: 8 }));
