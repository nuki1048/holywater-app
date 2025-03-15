import { Stack } from 'tamagui';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { renderItem } from '../../utils/render-item';
import { useCallback, useRef } from 'react';
import { TopBannerSlide } from '../../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/MainNavigator';

export const CarouselBanner: React.FC<{
  data: TopBannerSlide[];
}> = ({ data }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const scrollOffsetValue = useSharedValue<number>(0);
  const progress = useSharedValue<number>(0);

  const ref = useRef<ICarouselInstance>(null);

  const onPressPagination = useCallback(
    (index: number) => {
      ref.current?.scrollTo({
        count: index - progress.value,
        animated: true,
      });
    },
    [progress]
  );

  const onPress = useCallback(
    (id: string) => {
      navigation.navigate('DetailsScreen', { id: parseInt(id) });
    },
    [navigation]
  );

  if (data.length === 0) {
    return null;
  }

  return (
    <Stack
      width='100%'
      height={160}
      borderRadius={16}
      overflow='hidden'
      backgroundColor='transparent'
    >
      <Carousel
        ref={ref}
        testID={'xxx'}
        loop={true}
        width={430}
        height={160}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlayInterval={3000}
        autoPlay
        data={data}
        defaultScrollOffsetValue={scrollOffsetValue}
        style={{ width: '100%' }}
        onProgressChange={progress}
        onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
          'worklet';
          g.enabled(false);
        }}
        renderItem={renderItem<TopBannerSlide, 'cover'>('cover', {
          rounded: true,
          onPress,
        })}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: '#C1C2CA', borderRadius: 100 }}
        activeDotStyle={{ backgroundColor: '#D0006E' }}
        containerStyle={{
          gap: 5,
          marginBottom: 10,
          position: 'absolute',
          bottom: 0,
        }}
        onPress={onPressPagination}
      />
    </Stack>
  );
};
