import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from '@chakra-ui/react';

export default function TxTable(data) {
  return (
    <TableContainer minW={'100%'}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Amount</Th>
            <Th>Timestamp</Th>
            <Th>Valid</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(data.data || data).map((item, idx) => {
            return (
              <Tr>
                <Td>{idx}</Td>
                <Td textOverflow="ellipsis">
                  <Text
                    width={'200px'}
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {item.fromAddress || 'System'}
                  </Text>
                </Td>
                <Td>
                  <Text
                    width={'200px'}
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {item.toAddress}
                  </Text>
                </Td>
                <Td>{item.amount}</Td>
                <Td>{item.timestamp}</Td>
                <Td>{item.isValid().toString()}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
