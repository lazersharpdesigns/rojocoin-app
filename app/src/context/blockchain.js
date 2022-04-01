import { createContext, useContext, useEffect, useState } from 'react';
import { BlockChain } from 'rojocoin/blockchain';

const BlockChainContext = createContext();

export const BlockChainProvider = ({ children }) => {
  const [bc, setBc] = useState(new BlockChain());

  const updateSettings = (difficulty, reward) => {
    localStorage.setItem(
      'settings',
      JSON.stringify({
        difficulty: difficulty ?? 2,
        reward: reward ?? 100,
      })
    );
    updateBC(difficulty, reward);
  };

  const setup = () => {
    if (localStorage.getItem('settings')) {
      try {
        const parsed = JSON.parse(localStorage.getItem('settings'));
        setBc(() => {
          let bchain = new BlockChain();
          bchain.difficulty = parsed.difficulty ?? 2;
          bchain.miningReward = parsed.reward ?? 100;
          return bchain;
        });
      } catch (_) {
        // no settings
      }
    }
  };

  const getBalance = key => {
    return bc.getBalanceOfAddress(key);
  };

  const updateBC = (d, m) => {
    setBc(() => {
      let bchain = new BlockChain();
      bchain.difficulty = d ?? bc.difficulty;
      bchain.miningReward = m ?? bc.miningReward;
      bchain.chain = bc.chain;
      bchain.pendingTransactions = bc.pendingTransactions;
      return bchain;
    });
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <BlockChainContext.Provider
      value={{ bc, updateSettings, getBalance, updateBC }}
    >
      {children}
    </BlockChainContext.Provider>
  );
};

export const useBlockChain = () => {
  return useContext(BlockChainContext);
};
