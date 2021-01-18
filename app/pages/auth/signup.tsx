import { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';

import { useAuth } from 'lib/useAuth';

import PageContainer from 'components/PageContainer';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, setError, signUp } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    signUp(email, password);
  };

  // Error message handler
  const toast = useToast();

  useEffect(() => {
    error && console.log(error);
    error &&
      toast({
        title: error,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });

    return () => setError('');
  }, [error]);

  return (
    <PageContainer title="Sign Up">
      <Stack
        as="form"
        direction="column"
        align="flex-start"
        spacing={4}
        onSubmit={onSubmit}
      >
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button type="submit">Sign In</Button>
      </Stack>
    </PageContainer>
  );
}
