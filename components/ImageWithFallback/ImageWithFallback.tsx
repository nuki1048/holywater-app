import { useState } from 'react';
import { Image, ImageProps, Stack } from 'tamagui';

export const SafeImageDisplay: React.FC<ImageProps> = ({
  source,
  width,
  height,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const handleError = () => {
    console.log('Error loading image');
    setHasError(true);
  };

  if (hasError) {
    return (
      <Stack
        gap={8}
        width={width}
        height={height}
        borderRadius={16}
        backgroundColor='#C4C4C4'
        testID='image'
      ></Stack>
    );
  }
  return (
    <>
      <Image
        source={source}
        width={width}
        height={height}
        borderRadius={16}
        onError={handleError}
        testID='image'
        alt='Image'
      />
    </>
  );
};
