import { extendTheme } from '@chakra-ui/react';

const fonts = {
  body: 'Josefin Sans, sans-serif',
  heading: 'Josefin Sans, sans-serif',
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
