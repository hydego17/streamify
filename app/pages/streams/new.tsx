import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Link as ChakraLink,
  Stack,
  Input,
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
  Image,
} from '@chakra-ui/react';

import { useCreateStreamMutation } from 'lib/graphql/createStream.graphql';
import PageContainer from 'components/PageContainer';

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
      <PageContainer title="Create Stream" maxW="full">
        <Stack
          as="form"
          direction="column"
          onSubmit={onSubmit}
          align="flex-start"
          spacing={4}
          maxW="md"
        >
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
            <FormHelperText>
              You can get the sample url from{' '}
              <ChakraLink
                color="orange.500"
                href="https://iframely.com/"
                target="_blank"
                rel="noopener"
              >
                iframely
              </ChakraLink>
            </FormHelperText>
          </FormControl>

          <Button type="submit">Create Stream</Button>
        </Stack>
      </PageContainer>
    </>
  );
}
