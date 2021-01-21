import { GetServerSideProps } from 'next';
import { Container } from '@material-ui/core';
import { useStreamQuery, Stream } from 'lib/graphql/stream.graphql';

import Hero from 'components/Hero';
import Content from 'components/Content';

export default function StreamDetail({ id }) {
  const { data, loading } = useStreamQuery({
    variables: { streamId: id },
  });

  if (!loading && data && data.stream) {
    return (
      <Container maxWidth="lg">
        <Hero stream={data.stream as Stream} />
        <Content url={data.stream.url} />
      </Container>
    );
  }

  return null;
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { id },
}) => {
  return {
    props: { id },
  };
};
