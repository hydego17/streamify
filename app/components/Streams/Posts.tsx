import { ReactElement } from 'react';
import Link from 'next/link';
import { Stack, Box, Flex, Text, Heading, Image } from '@chakra-ui/react';

import { Stream } from 'lib/graphql/streams.graphql';

interface PostsProps {
  streams: Stream[];
}

export default function Posts({ streams }: PostsProps): ReactElement {
  return (
    <>
      <Stack direction="column" spacing={4}>
        {streams.map((post) => (
          <Box
            key={post._id}
            border="1px solid #ededed"
            rounded="md"
            overflow="hidden"
          >
            <Link href={`/streams/${post._id}`}>
              <a>
                <Flex>
                  <Stack direction="column" p={4} w="full" overflowX="hidden">
                    <Heading size="md">{post.title}</Heading>
                    <Text fontSize="sm" isTruncated>
                      {post.url}
                    </Text>
                    <Text>{post.description}</Text>
                  </Stack>

                  <Box maxW={150} maxH={150} overflow="hidden">
                    <Image
                      w={200}
                      h={200}
                      src="https://source.unsplash.com/random"
                      title="Image title"
                    />
                  </Box>
                </Flex>
              </a>
            </Link>
          </Box>
        ))}
      </Stack>
    </>
  );
}
