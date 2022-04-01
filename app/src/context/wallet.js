import { createContext, useContext, useEffect, useState } from 'react';
import keys from 'rojocoin/key.json';

const WalletContext = createContext();
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate(keys.private);

export const WalletProvider = ({ children }) => {
  const setup = () => {
    if (localStorage.getItem('key')) {
      setKey(localStorage.getItem('key'));
    }
    if (localStorage.getItem('settings')) {
      try {
        const parsed = JSON.parse(localStorage.getItem('settings'));
        setSettings(parsed);
      } catch (err) {
        console.error('Settings can not be found, using default settings');
      }
    }
  };

  const createWallet = () => {
    const myWalletAddress = myKey.getPublic('hex');
    if (myWalletAddress) {
      setKey(myWalletAddress);
      return localStorage.setItem('key', myWalletAddress);
    }
  };

  const [key, setKey] = useState('');

  const [settings, setSettings] = useState({
    difficulty: 2,
    reward: 100,
  });

  const updateSettings = (difficulty, reward) => {
    localStorage.setItem(
      'settings',
      JSON.stringify({
        difficulty: difficulty ?? 2,
        reward: reward ?? 100,
      })
    );
    setSettings({
      difficulty: difficulty ?? 2,
      reward: reward ?? 100,
    });
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <WalletContext.Provider
      value={{ ...settings, key, createWallet, updateSettings, myKey }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};
