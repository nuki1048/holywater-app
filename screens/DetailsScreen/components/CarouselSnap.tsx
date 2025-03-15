import Carousel from 'react-native-reanimated-carousel';
import { View } from 'tamagui';
import { Book } from '../../../types';
import { renderItem } from '../../../utils/render-item';
import { SharedValue } from 'react-native-reanimated';
import { Dispatch, SetStateAction } from 'react';
import { Dimensions } from 'react-native';

interface Props {
  index: number;
  data: Book[];

  onProgressChange?:
    | SharedValue<number>
    | ((offsetProgress: number, absoluteProgress: number) => void)
    | undefined;
}
const paddingHorizontal = Dimensions.get('window').width * 0.2;
export const CarouselSnap: React.FC<Props> = ({
  data,
  index,
  onProgressChange,
}) => {
  return (
    <View
      width='100%'
      justifyContent='center'
      paddingHorizontal={paddingHorizontal}
    >
      <Carousel
        testID={'xxx'}
        width={300}
        height={250}
        pagingEnabled={true}
        snapEnabled={true}
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 30,
        }}
        defaultIndex={index}
        onProgressChange={onProgressChange}
        loop={false}
        mode='parallax'
        data={data}
        style={{
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          overflow: 'visible',
        }}
        onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
          'worklet';
          g.enabled(false);
        }}
        renderItem={renderItem<Book, 'cover_url'>('cover_url', {
          rounded: true,
          style: {
            width: 200,
            height: 500,
          },
          showText: true,
        })}
      />
    </View>
  );
};
