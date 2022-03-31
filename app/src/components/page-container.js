import { Container } from '@chakra-ui/react';
import React from 'react';

function PageContainer({ children }) {
  return (
    <Container minH={'80vh'} minW={'95vw'} padding={4}>
      {children}
    </Container>
  );
}

export default PageContainer;
