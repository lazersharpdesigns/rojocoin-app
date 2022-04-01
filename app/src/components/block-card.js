// Sample card from Airbnb

import { Box, Heading, Text } from '@chakra-ui/react';

export default function BlockCard({ block, selected, onSelect }) {
  return (
    <Box
      width={{ base: '90%', md: '50%', lg: '33.3%' }}
      onClick={() => onSelect(block)}
      _hover={{
        cursor: 'pointer',
      }}
      maxW="sm"
      borderColor={selected ? 'blue.300' : 'initial'}
      borderWidth={selected ? '3px' : '1px'}
      borderRadius="lg"
      overflow="hidden"
    >
      <Box p="6">
        <Heading display={'flex'} size={'lg'}>
          <Text>Block {block.index} </Text>
          <Text fontWeight={400} size={'md'}>
            {block.previousHash == 0 ? '(Genesis block)' : ''}
          </Text>
        </Heading>
      </Box>
      <hr />
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <p>Hash</p>
          {block.hash}
        </Box>
        <Box
          mt="6"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <p>Hash of previous block</p>
          {block.previousHash}
        </Box>
      </Box>
      <hr />
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <p>Nonce</p>
          {block.nonce}
        </Box>
      </Box>
      <hr />
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <p>Timestamp</p>
          {new Date(block.timestamp).getTime()}
        </Box>
      </Box>
    </Box>
  );
}
