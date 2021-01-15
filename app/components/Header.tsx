import Link from 'next/link';
import { Container, Box, Flex, Button, Heading } from '@chakra-ui/react';

import { useAuth } from 'lib/useAuth';
import { ThemeSwitcher } from 'components/ThemeSwitcher';

export default function Header() {
  const { user } = useAuth();

  const links = [
    !user && { label: 'Sign Up', href: '/auth/signup' },
    !user && { label: 'Sign In', href: '/auth/signin' },
    user && { label: 'Create', href: '/streams/new' },
    user && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <Link href={href} key={href}>
          <Button variant="ghost" >{label} </Button>
        </Link>
      );
    });

  return (
    <Box as="header" py={6}>
      <Container maxW="3xl">
        <Flex justify="space-between" align="center">
          <Flex as="nav" align="center">
            <Heading size="md" pr={4}>
              <Link href="/">Streamify</Link>
            </Heading>

            {links}
          </Flex>

          <ThemeSwitcher />
        </Flex>
      </Container>
    </Box>
  );
}
