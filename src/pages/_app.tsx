import React from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { DailyWorkProvider } from '../contexts/DailyWorkContext';

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <ChakraProvider theme={theme}>
      <DailyWorkProvider>
        <Component {...pageProps} />
      </DailyWorkProvider>
    </ChakraProvider>
  );
}

export default MyApp;
