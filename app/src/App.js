import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { WalletProvider } from './context/wallet';
import Settings from './pages/settings';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <WalletProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="settings" element={<Settings />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </ChakraProvider>
  );
}

export default App;
