import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  Input,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useWallet } from '../context/wallet';

export default function CreateTx({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wallet = useWallet();

  const [tx, setTx] = useState({
    to: '',
    amount: '',
  });

  useEffect(() => {
    setTx({
      ...tx,
      from: wallet.key,
    });
  }, [wallet.key, tx]);

  const createTx = () => {
    wallet.onTransaction(tx.to, tx.amount);
    onClose();
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={600} mb="8px">
              From Address
            </Text>
            <Input
              disabled
              value={wallet.key}
              onChange={({ target: { value } }) =>
                setTx({ ...tx, from: value })
              }
              size="sm"
            />
            <Text fontWeight={400} mb={4}>
              This is your wallet address
            </Text>
            <Text fontWeight={600} mb="8px">
              To Address
            </Text>
            <Input
              value={tx.to}
              onChange={({ target: { value } }) => setTx({ ...tx, to: value })}
              size="sm"
            />
            <Text fontWeight={400} mb={4}>
              To whom do you want to send the transaction
            </Text>
            <Text fontWeight={600} mb="8px">
              Amount
            </Text>
            <Input
              type={'number'}
              value={tx.amount}
              onChange={({ target: { value } }) =>
                setTx({ ...tx, amount: value })
              }
              size="sm"
            />
            <Text fontWeight={400} mb="8px">
              How much do you want to send
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={createTx}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
