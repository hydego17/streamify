import Link from 'next/link';
import { Heading, Box, Button, Text } from '@chakra-ui/react';

export default function About() {
  return (
    <>
      <Box my={4}>
        <Heading>About Page</Heading>

        <Text as="article" py={4}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi autem
          dolores dolorum facere nisi dicta doloremque tempore illum obcaecati,
          sunt, dolor amet sed magnam suscipit quidem praesentium molestias
          nulla magni?
        </Text>

        <Box as="nav" mt={4}>
          <Link href="/">
            <Button>Home</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
