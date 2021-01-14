import Link from 'next/link';
import { Container, Typography, Box, Button } from '@material-ui/core';

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js Starter
        </Typography>

        <Link href="/about">
          <Button variant="contained" color="primary">
            About
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
