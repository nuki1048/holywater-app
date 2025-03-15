import { Stack, Text } from 'tamagui';

export const ErrorFallback = () => {
  return (
    <Stack
      width='100%'
      height='100%'
      justifyContent='center'
      alignItems='center'
    >
      <Text color='white' fontSize={24} fontWeight={700} textAlign='center'>
        No items available.
      </Text>
    </Stack>
  );
};
