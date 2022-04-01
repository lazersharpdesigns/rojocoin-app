import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import { WalletProvider } from './context/wallet';
import Settings from './pages/settings';
import { BlockChainProvider } from './context/blockchain';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BlockChainProvider>
        <WalletProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="settings" element={<Settings />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </WalletProvider>
      </BlockChainProvider>
    </ChakraProvider>
  );
}

export default App;
