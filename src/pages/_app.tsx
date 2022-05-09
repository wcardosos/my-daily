import React from 'react';
import { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { queryClient } from '../lib/react-query/queryClient';
import theme from '../styles/theme';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): React.ReactNode {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
