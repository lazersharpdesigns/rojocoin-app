import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import PageContainer from '../components/page-container';
import { BlockChain } from 'rojocoin/blockchain';
import BlockCard from '../components/block-card';
import { useWallet } from '../context/wallet';
import TxTable from '../components/tx-table';

function Home() {
  const [blocks, setBlocks] = useState([]);

  const wallet = useWallet();
  const [selectedBlock, setSelectedBlock] = useState({
    index: 1,
    transactions: [],
  });
  const rojoCoin = new BlockChain();

  const getBalance = useCallback(() => {
    return rojoCoin.getBalanceOfAddress(wallet.key);
  }, [rojoCoin.getBalanceOfAddress(wallet.key), wallet.key]);

  const onTransaction = tx => {
    rojoCoin.addTransaction(tx);
    rojoCoin.minePendingTransactions(wallet.key);
    setBlocks(rojoCoin.chain);
  };

  useEffect(() => {
    if (rojoCoin.chain.length == 1) {
      rojoCoin.minePendingTransactions(wallet.key);
      setBlocks(rojoCoin.chain);
    }
  }, [wallet.key]);

  return (
    <PageContainer onTransaction={onTransaction} balance={getBalance}>
      <Box pb={8} pt={2}>
        <Heading>Blocks on chain</Heading>
        <Text size={'md'}>
          Each card represents a block on the chain. Click on the block to see
          what is stored inside
        </Text>

        <Stack
          mt={8}
          direction={{ base: 'column', md: 'row' }}
          justifyItems={'center'}
          spacing={2}
        >
          {blocks.map((item, index) => {
            return (
              <BlockCard
                onSelect={b => setSelectedBlock(b)}
                selected={index + 1 === selectedBlock.index}
                key={item.hash}
                block={{ ...item, index: index + 1 }}
              />
            );
          })}
        </Stack>
      </Box>

      <Box pb={8} pt={2}>
        <Heading>Transactions inside block {selectedBlock.index}</Heading>
        {selectedBlock?.transactions?.length === 0 ? (
          <Text size={'md'}>This block has no transactions</Text>
        ) : (
          <Stack mt={8} direction={'row'} spacing={2}>
            <TxTable data={selectedBlock.transactions} />
          </Stack>
        )}
      </Box>
    </PageContainer>
  );
}

export default Home;
