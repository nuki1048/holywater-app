import { Stack, StackProps, Text, TextStyle, ViewProps } from 'tamagui';
import { Book } from '../../types';
import { SafeImageDisplay } from '../ImageWithFallback/ImageWithFallback';
import { StyleProp, TouchableOpacity } from 'react-native';
import { CSSProperties } from 'react';

interface BookCardProps extends Book, Omit<StackProps, 'id'> {
  onPress: () => void;
  textStyles?: StyleProp<CSSProperties | TextStyle>;
  textColor?: string;
}
export const BookCard: React.FC<BookCardProps> = ({
  name,
  cover_url,
  onPress,
  id,
  textColor = 'white',
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress} key={id} testID='button'>
      <Stack gap={8} width={130} height={200} {...props}>
        <SafeImageDisplay
          source={{ uri: cover_url }}
          width={130}
          height={150}
          borderRadius={16}
          testID='image'
        />
        <Text
          color={textColor}
          opacity={0.7}
          fontSize={16}
          fontWeight={600}
          numberOfLines={2}
          maxInlineSize={130}
        >
          {name}
        </Text>
      </Stack>
    </TouchableOpacity>
  );
};
