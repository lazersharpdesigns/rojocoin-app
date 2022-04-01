import { createContext, useContext, useEffect, useState } from 'react';
import { Transaction } from 'rojocoin/blockchain';
import keys from 'rojocoin/key.json';
import { useBlockChain } from './blockchain';

const WalletContext = createContext();
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate(keys.private);

export const WalletProvider = ({ children }) => {
  const { bc, updateBC } = useBlockChain();
  const [key, setKey] = useState('');

  const setup = () => {
    if (localStorage.getItem('key')) {
      setKey(localStorage.getItem('key'));
    }
  };

  const createWallet = () => {
    const myWalletAddress = myKey.getPublic('hex');
    if (myWalletAddress) {
      setKey(myWalletAddress);
      bc.minePendingTransactions(myWalletAddress);
      updateBC();
      return localStorage.setItem('key', myWalletAddress);
    }
  };

  const reset = () => {
    localStorage.removeItem('key');
    setKey('');
  };

  const onTransaction = (to, amount) => {
    const tx1 = new Transaction(key, to, amount);
    tx1.signTransaction(myKey);
    bc.addTransaction(tx1);
    bc.minePendingTransactions(key);
    updateBC();
    return true;
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <WalletContext.Provider value={{ key, createWallet, onTransaction, reset }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};
