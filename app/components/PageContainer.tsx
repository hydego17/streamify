import { Box, Heading } from '@chakra-ui/react';

export default function PageContainer({ children, title, maxW = 'md' }) {
  return (
    <>
      <Box my={4} maxW={maxW}>
        <Box pb={4}>
          <Heading>{title}</Heading>
        </Box>
        {children}
      </Box>
    </>
  );
}
