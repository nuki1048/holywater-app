import {
  Button,
  Paragraph,
  ScrollView,
  Stack,
  styled,
  Text,
  View,
} from 'tamagui';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigators/MainNavigator';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useBooksStore } from '../../stores/useBooksStore';

import { ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSharedValue } from 'react-native-reanimated';
import { useCallback, useMemo, useState } from 'react';
import { Book } from '../../types';

// @ts-ignore
import imageBg from '../../assets/bg-details.png';
import { CarouselSnap } from './components/CarouselSnap';
import { BookDetails } from './components/BookDetails';
import { YouWillLikeSection } from './components/YouWillLikeSection';

const BoldText = styled(Text, {
  fontWeight: '700',
  fontSize: 18,
  color: '#0B080F',
});

export const DetailsScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'DetailsScreen'>
> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { id } = route.params;
  const { detailCarousels, youWillLikeSection } = useBooksStore();

  if (!detailCarousels) return null;

  const youWillLikeSectionBooks = detailCarousels?.filter((book) =>
    youWillLikeSection?.includes(book.id)
  );
  const defaultBook = useMemo(() => {
    return detailCarousels?.find((book) => book.id === id);
  }, [id]);
  const defaultIndex = detailCarousels?.findIndex((book) => book.id === id);

  const [book, setBook] = useState<Book | undefined>(defaultBook);
  const currentIndex = useSharedValue<number>(defaultIndex);
  const progress = useSharedValue<number>(currentIndex.value);

  if (!book) return null;

  const onProgressChange = useCallback(
    (_absoluteProgress: number, index: number) => {
      progress.set(index);
      setBook(detailCarousels[Math.floor(index)]);
    },
    [detailCarousels]
  );

  return (
    <ImageBackground source={imageBg} style={{ flex: 1 }} resizeMode='cover'>
      <View
        paddingTop={insets.top}
        flex={1}
        height='100%'
        background='transparent'
      >
        <View
          flex={2}
          justifyContent='flex-start'
          alignItems='flex-start'
          backgroundColor='transparent'
          paddingHorizontal={20}
        >
          <Button
            onPress={() => navigation.goBack()}
            variant='outlined'
            borderWidth={0}
            color='white'
          >
            <Button.Icon>
              <ArrowLeft size={24} />
            </Button.Icon>
          </Button>
          <CarouselSnap
            data={detailCarousels}
            index={currentIndex.value}
            onProgressChange={onProgressChange}
          />
        </View>
        <View
          flex={2}
          padding={20}
          backgroundColor='white'
          borderTopEndRadius={20}
          borderTopStartRadius={20}
        >
          <BookDetails
            genre={book?.genre}
            quotes={book?.quotes}
            likes={book?.likes}
            views={book?.views}
          />
          <ScrollView
            flex={1}
            width='100%'
            showsVerticalScrollIndicator={false}
          >
            <Stack
              paddingVertical={20}
              gap={8}
              borderBottomColor='#D9D5D6'
              borderBottomWidth={1}
            >
              <BoldText fontSize={20}>Summary</BoldText>
              <Paragraph fontWeight={600} color='#393637'>
                {book?.summary}
              </Paragraph>
            </Stack>

            <YouWillLikeSection data={youWillLikeSectionBooks} />
            <Button
              borderRadius={30}
              width={278}
              alignSelf='center'
              backgroundColor='#DD48A1'
              color='white'
              fontWeight={700}
              fontSize={16}
            >
              Read Now
            </Button>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};
