import { useEffect } from 'react';

import { useStreamsQuery, Stream } from 'lib/graphql/streams.graphql';

import PageContainer from 'components/PageContainer';
import Posts from 'components/Streams/Posts';

export default function Streams() {
  const { data, loading, refetch } = useStreamsQuery({ errorPolicy: 'ignore' });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <PageContainer title="Streams" maxW="3xl">
      {!loading && data && data.streams && (
        <Posts streams={data.streams as Stream[]} />
      )}
    </PageContainer>
  );
}
