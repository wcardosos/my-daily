import React from 'react';
import { QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { queryClient } from '../lib/react-query/queryClient';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
