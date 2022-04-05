import React from 'react';
import {
  Avatar,
  Box,
  Stack,
  Text,
} from '@chakra-ui/react';

interface IProfileProps {
  email: string
  name: string
  pictureUrl?: string
}

export default function Profile({
  email,
  name,
  pictureUrl,
}: IProfileProps) {
  return (
    <Stack data-testid="profile" direction={['column', 'row']} spacing="4">
      <Avatar data-testid="avatar" name={name} src={pictureUrl} />
      <Box>
        <Text as="strong">{name}</Text>
        <Text>{email}</Text>
      </Box>
    </Stack>
  );
}

Profile.defaultProps = {
  pictureUrl: null,
};
