import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={Home} />
          <Route path="*" element={Home} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
