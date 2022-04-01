import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import PageContainer from '../components/page-container';
import BlockCard from '../components/block-card';
import TxTable from '../components/tx-table';
import { useBlockChain } from '../context/blockchain';

function Home() {
  const { bc: rojoCoin } = useBlockChain();
  const [selectedBlock, setSelectedBlock] = useState({
    index: 1,
    transactions: [],
  });

  console.log(rojoCoin.chain);

  return (
    <PageContainer>
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
          alignItems="center"
          spacing={2}
          overflowY="scroll"
        >
          {rojoCoin.chain.map((item, index) => {
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
