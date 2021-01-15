import { ReactElement } from 'react';
import Link from 'next/link';
import {  Stack, Box, Flex, Text, Heading, Image } from '@chakra-ui/react';

import { Stream } from 'lib/graphql/streams.graphql';

interface PostsProps {
  streams: Stream[];
}

export default function Posts({ streams }: PostsProps): ReactElement {
  return (
    <>
      <Stack direction="column" spacing={4}>
        {streams.map((post) => (
          <Box key={post._id} border="1px solid #ededed" rounded="md">
            <Link href={`/streams/${post._id}`}>
              <a>
                <Flex>
                  <Box w="full" p={4}>
                    <Heading size="md">{post.title}</Heading>
                    <Text>{post.url}</Text>
                    <Text>{post.description}</Text>
                  </Box>

                  <Image
                    w={120}
                    src="https://source.unsplash.com/random"
                    title="Image title"
                  />
                </Flex>
              </a>
            </Link>
          </Box>
        ))}
      </Stack>
    </>
  );
}
