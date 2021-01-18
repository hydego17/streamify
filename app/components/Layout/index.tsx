import { ReactNode } from 'react';
import Header from 'components/Layout/Header';

import { Container } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />

      <Container maxW="3xl">
        {children}
      </Container>
    </>
  );
};

export default Layout;
