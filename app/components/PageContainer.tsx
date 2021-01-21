import { Box, Heading } from '@chakra-ui/react';

export default function PageContainer({
  children,
  title,
  maxW = 'md',
  background = null,
}) {
  return (
    <>
      <Box my={4} maxW={maxW} bgImage={background} position="relative" p={6}>
        {background && <PageOverlay />}
        <Box pb={4}>
          <Heading>{title}</Heading>
        </Box>
        {children}
      </Box>
    </>
  );
}

const PageOverlay = () => (
  <Box
    position="absolute"
    top={0}
    bottom={0}
    right={0}
    left={0}
    bgColor="rgba(0,0,0,0.3)"
    p={6}
  />
);
