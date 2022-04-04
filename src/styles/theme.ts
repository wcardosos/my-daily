import { extendTheme } from '@chakra-ui/react';

const fonts = {
  body: 'sans-serif',
  heading: 'sans-serif',
};

const styles = {
  global: {
    'html, body': {
      bgColor: 'gray.50',
    },
  },
};

const theme = extendTheme({
  fonts,
  styles,
});

export default theme;
