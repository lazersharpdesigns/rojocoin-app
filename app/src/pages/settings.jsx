import { Box, Button, Heading, Input, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PageContainer from '../components/page-container';
import { useWallet } from '../context/wallet';

function Settings() {
  const wallet = useWallet();
  const toast = useToast();

  const [settings, setSettings] = useState({
    difficulty: wallet.difficulty,
    reward: wallet.reward,
  });

  useEffect(() => {
    setSettings({
      difficulty: wallet.difficulty,
      reward: wallet.reward,
    });
  }, [wallet.difficulty, wallet.reward]);

  const updateSettings = () => {
    wallet.updateSettings(
      parseInt(settings.difficulty),
      parseInt(settings.reward)
    );
    toast({
      title: 'Settings Updated.',
      description: 'You are set to go!',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <PageContainer>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        minWidth={'100%'}
        minH={'100%'}
        padding={6}
      >
        <Heading mb={2}>Settings</Heading>
        <hr />
        <Box mt={6}>
          <Text fontWeight={600} mb="8px">
            Difficulty
          </Text>
          <Input
            type={'number'}
            maxW={{ base: '90%', md: '30%' }}
            value={settings.difficulty}
            onChange={({ target: { value } }) =>
              setSettings({ ...settings, difficulty: value })
            }
            placeholder="How difficult should the mining be ?"
            size="sm"
          />
          <Text fontWeight={400} mb={8}>
            Determines how long the mining will take. Higher numbers are slower.
          </Text>
          <Text fontWeight={600} mb="8px">
            Reward
          </Text>
          <Input
            type={'number'}
            maxW={{ base: '90%', md: '30%' }}
            value={settings.reward}
            onChange={({ target: { value } }) =>
              setSettings({ ...settings, reward: value })
            }
            placeholder="Default mining reward"
            size="sm"
          />
          <Text fontWeight={400} mb="8px">
            Your reward after an successfull mine.
          </Text>

          <Button
            mt={8}
            display={{ base: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            href={'#'}
            _hover={{
              bg: 'blue.300',
            }}
            onClick={updateSettings}
          >
            Save Settings
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
}

export default Settings;
