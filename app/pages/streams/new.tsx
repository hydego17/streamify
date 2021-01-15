import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';

import { Container, TextField, Typography } from '@material-ui/core';

import { useCreateStreamMutation } from 'lib/graphql/createStream.graphql';

export default function CreateStream() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const router = useRouter();

  // Signing In
  const [createStream] = useCreateStreamMutation();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createStream({
        variables: {
          input: {
            title,
            description,
            url,
          },
        },
      });

      if (data.addStream._id) {
        router.push('/streams');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box my={4} maxW="md">
        <Box pb={4}>
          <Heading>Create Stream</Heading>
        </Box>

        <VStack as="form" onSubmit={onSubmit} align="flex-start" spacing={4}>
          <FormControl id="title">
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isRequired
            />
          </FormControl>

          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isRequired
            />
          </FormControl>
          <FormControl id="url">
            <FormLabel>URL</FormLabel>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              isRequired
            />
          </FormControl>

          <Button type="submit">Create Stream</Button>
        </VStack>
      </Box>
    </>
  );
}
