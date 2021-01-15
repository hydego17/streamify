import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';

import { useAuth } from 'lib/useAuth';
import PageContainer from 'components/PageContainer';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, signUp } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    signUp(email, password);
  };

  return (
    <PageContainer title="Sign Up">
      {/* Signing Page Header */}

      {/* Add error message */}

      {error && <Box>{error}</Box>}

      <Box as="form" onSubmit={onSubmit}>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
          />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
          />
        </FormControl>

        <Button my={2} type="submit">
          Sign In
        </Button>
      </Box>
    </PageContainer>
  );
}
