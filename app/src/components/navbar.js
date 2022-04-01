import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Heading,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useWallet } from '../context/wallet';
import CreateTx from './create-tx-modal';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onTransaction, balance }) {
  const router = useNavigate();
  const wallet = useWallet();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'blue.800')}
        color={useColorModeValue('blue.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'start' }}>
          <Heading
            onClick={() => router('/')}
            _hover={{
              cursor: 'pointer',
            }}
            fontWeight="bold"
            textAlign={useBreakpointValue({ base: 'left' })}
            fontFamily={'heading'}
            display="flex"
            alignItems="center"
            size="md"
            color={useColorModeValue('blue.800', 'white')}
          >
            Rojo Coinbase
            <Heading ml="2" size="sm" fontWeight={'light'}>
              (Demo Purposes Only)
            </Heading>
          </Heading>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          alignItems="center"
          spacing={2}
        >
          <Text width={'max-content'}>Balance: {balance()}</Text>
          {wallet.key && (
            <Button
              display={{ base: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'blue.400'}
              borderColor={'blue.400'}
              href={'#'}
              variant="outline"
              onClick={() => {
                router('/settings');
              }}
              _hover={{
                borderColor: 'blue.300',
              }}
            >
              Settings
            </Button>
          )}
          {wallet.key ? (
            <CreateTx onTransaction={onTransaction}>
              <Button
                display={{ base: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'blue.400'}
                href={'#'}
                _hover={{
                  bg: 'blue.300',
                }}
              >
                Create Transaction
              </Button>
            </CreateTx>
          ) : (
            <Button
              display={{ base: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'blue.400'}
              href={'#'}
              onClick={() => {
                wallet.createWallet();
              }}
              _hover={{
                bg: 'blue.300',
              }}
            >
              Create Wallet
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}
