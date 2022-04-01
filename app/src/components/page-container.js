import { Container } from '@chakra-ui/react';
import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

function PageContainer({ children, onTransaction, balance }) {
  return (
    <>
      <Navbar onTransaction={onTransaction} balance={balance} />
      <Container minH={'80vh'} minW={'95vw'} padding={4}>
        {children}
      </Container>
      <Footer />
    </>
  );
}

export default PageContainer;
