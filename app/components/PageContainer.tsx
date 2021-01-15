import { Box, Heading } from '@chakra-ui/react';

export default function PageContainer({ children, title }) {
  return (
    <>
      <Box my={4} maxW="md">
        <Box pb={4}>
          <Heading>{title}</Heading>
        </Box>
        {children}
      </Box>
    </>
  );
}
