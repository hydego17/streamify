import { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from 'lib/useAuth';
import { useApollo } from 'lib/apollo';

import 'styles/globals.css';
import Header from 'components/Header';

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  const [darkState, setDarkState] = useState(false);
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  useEffect(() => {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <AuthProvider>
          <Header />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
