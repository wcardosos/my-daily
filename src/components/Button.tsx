import React from 'react';
import {
  Button as ButtonChakra,
  ButtonProps as ButtonChakraProps,
} from '@chakra-ui/react';

/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
enum ButtonSizes {
  SMALL = 'small',
  NORMAL = 'normal',
  LARGE = 'large'
}
/* eslint-enable no-unused-vars */

interface IButtonProps extends ButtonChakraProps {
  text: string
  size: string
  onClick: () => void
}

export default function Button({
  text,
  size,
  onClick,
  ...rest
}: IButtonProps) {
  const sizes = {
    [ButtonSizes.SMALL]: { width: ['19', '24'], font: ['10px', '12px'] },
    [ButtonSizes.NORMAL]: { width: ['24', '32'], font: ['12px', '16px'] },
  };

  return (
    <ButtonChakra
      w={sizes[size].width}
      h={['8', '12']}
      fontSize={sizes[size].font}
      colorScheme="purple"
      bgColor="purple.700"
      onClick={onClick}
      {...rest}
    >
      {text}
    </ButtonChakra>
  );
}
