import { ScrollView, Stack, Text, View } from 'tamagui';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper/SafeAreaWrapper';
import { CarouselBanner } from '../../components/CarouselBanner/CarouselBanner';
import { useBooksStore } from '../../stores/useBooksStore';
import { ItemsSection } from '../../components/ItemsSection/ItemsSection';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigators/MainNavigator';
import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';
import { groupBooksByGenre } from '../../utils/data-utils';

export const HomeScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Home'>
> = () => {
  const { topBannerSlide, books } = useBooksStore();
  const [sortedByGenre, setSortedByGenre] = useState<
    Record<string, typeof books>
  >({});

  useEffect(() => {
    const sortedByGenre = groupBooksByGenre(books);
    setSortedByGenre(sortedByGenre);
  }, [books]);

  const isDataExist = Object.keys(sortedByGenre).length > 0;

  return (
    <SafeAreaWrapper
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#101010',
      }}
    >
      <Stack paddingHorizontal={10} gap={16}>
        <View width='100%' justifyContent='flex-start' alignSelf='flex-start'>
          <Text
            color='#D0006E'
            fontSize={20}
            fontWeight={700}
            alignSelf='flex-start'
          >
            Library
          </Text>
        </View>
        <ScrollView
          gap={16}
          display='flex'
          showsVerticalScrollIndicator={false}
          height='100%'
        >
          <CarouselBanner data={topBannerSlide} />
          {isDataExist ? (
            Object.entries(sortedByGenre).map(([genre, items]) => (
              <ItemsSection key={genre} title={genre} items={[...items]} />
            ))
          ) : (
            <ErrorFallback />
          )}
        </ScrollView>
      </Stack>
    </SafeAreaWrapper>
  );
};
