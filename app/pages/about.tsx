import Link from 'next/link';
import { Container, Typography, Box, Button } from '@material-ui/core';

export default function About() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Page
        </Typography>

        <Link href="/">
          <Button variant="contained" color="primary">
            Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
