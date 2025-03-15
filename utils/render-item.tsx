import { ImageStyle, StyleProp } from 'react-native';
import { CarouselRenderItem } from 'react-native-reanimated-carousel';
import { CarouselBannerSlideItem } from '../components/CarouselBannerSlideItem/CarouselBannerSlideItem';

interface Options {
  rounded?: boolean;
  style?: StyleProp<ImageStyle>;
  onPress?: (id: string) => void;
  showText?: boolean;
  name?: string;
  author?: string;
}
export const renderItem =
  <T extends Record<string, any>, K extends Extract<keyof T, string>>(
    uriKey: K,
    { rounded = false, style, onPress, showText }: Options = {}
  ): CarouselRenderItem<T> =>
  ({ index, item }: { index: number; item: T }) => {
    const uri = String(item[uriKey]);
    return (
      <CarouselBannerSlideItem
        index={index}
        rounded={rounded}
        source={{ uri }}
        style={style}
        author={item.author ?? ''}
        name={item.name ?? ''}
        showText={showText}
        onPress={() => onPress?.(String(item.id))}
      />
    );
  };
