import React, { useMemo } from 'react';
import {
  Dimensions,
  ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  StyleSheet,
  TouchableOpacity,
  type ViewProps,
} from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { Stack, Text } from 'tamagui';

interface Props extends AnimatedProps<ViewProps> {
  style?: StyleProp<ImageStyle>;
  index?: number;
  rounded?: boolean;
  source?: ImageSourcePropType;
  onPress?: () => void;
  showText?: boolean;
  name: string;
  author: string;
}

export const CarouselBannerSlideItem: React.FC<Props> = (props) => {
  const {
    style,
    index = 0,
    rounded = false,
    testID,
    showText,
    name,
    author,
    ...animatedViewProps
  } = props;

  const source = useMemo(
    () => (props.source ? props.source : undefined),
    [props.source, index]
  );
  const top = Dimensions.get('window').height * 0.08;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      key={index}
      style={{ flex: 1 }}
      testID='button'
    >
      <Animated.View
        testID={testID}
        style={[{ flex: 1, position: 'relative' }, style]}
        {...animatedViewProps}
      >
        <Animated.Image
          style={[styles.container, rounded && { borderRadius: 15 }]}
          source={source}
          resizeMode='cover'
        />
        {showText && (
          <Stack
            position='absolute'
            bottom={-top}
            left={0}
            right={0}
            justifyContent='space-between'
            alignItems='center'
            gap={8}
          >
            <Text
              color='white'
              fontSize={20}
              fontWeight={700}
              textAlign='center'
            >
              {name}
            </Text>
            <Text
              color='white'
              fontSize={14}
              fontWeight={700}
              textAlign='center'
            >
              {author}
            </Text>
          </Stack>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  overlayTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
