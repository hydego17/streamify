import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { initializeApollo } from 'lib/apollo';
import { useEditStreamMutation } from 'lib/graphql/editStream.graphql';
import { useDeleteStreamMutation } from 'lib/graphql/deleteStream.graphql';
import { StreamDocument } from 'lib/graphql/stream.graphql';

import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import PageContainer from 'components/PageContainer';

export default function EditStream({ id }) {
  const router = useRouter();
  const [editStream] = useEditStreamMutation();
  const [deleteStream] = useDeleteStreamMutation();

  const [state, setState] = useState({
    _id: '',
    title: '',
    description: '',
    url: '',
  });

  const { _id, title, description, url } = state;

  const fetchStream = async () => {
    const apollo = initializeApollo();
    const { data } = await apollo.query({
      query: StreamDocument,
      variables: { streamId: id },
    });
    setState(data.stream);
  };

  useEffect(() => {
    fetchStream();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await editStream({
        variables: { input: { id: _id, title, description, url } },
      });
      if (data.editStream._id) {
        router.push('/streams');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async (event) => {
    event.preventDefault();

    try {
      const { data } = await deleteStream({
        variables: { id },
      });
      if (data.deleteStream) {
        router.push('/streams');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PageContainer title="Edit Stream">
        <Stack
          as="form"
          direction="column"
          onSubmit={onSubmit}
          spacing={4}
          align="flex-start"
        >
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setState({ ...state, title: e.target.value })}
              isRequired
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
              isRequired
            />
          </FormControl>

          <FormControl>
            <FormLabel>URL</FormLabel>
            <Input
              value={url}
              onChange={(e) => setState({ ...state, url: e.target.value })}
              isRequired
            />
          </FormControl>

          <Stack direction="row" justify="space-between">
            <Button type="submit">Save</Button>

            <Button onClick={onDelete}>Delete</Button>
          </Stack>
        </Stack>
      </PageContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { id },
}) => {
  return {
    props: { id },
  };
};
