import Link from 'next/link';
import { Heading, Box, Button, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Box my={4}>
        <Heading>Welcome to Streamify</Heading>

        <Text as="article" py={4}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi autem
          dolores dolorum facere nisi dicta doloremque tempore illum obcaecati,
          sunt, dolor amet sed magnam suscipit quidem praesentium molestias
          nulla magni?
        </Text>

        <Box as="nav" mt={4}>
          <Link href="/about">
            <Button>About</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
