import { VirtualizedList } from 'react-native';
import { Text, View } from 'tamagui';
import { Book } from '../../../types';
import { BookCard } from '../../../components/BookCard/BookCard';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { RootStackParamList } from '../../../navigators/MainNavigator';

interface Props {
  data: Book[] | undefined;
}

export const YouWillLikeSection: React.FC<Props> = ({ data }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const renderItemBook = ({ item }: { item: Book }) => (
    <BookCard
      {...item}
      onPress={() => {
        navigation.dispatch(
          StackActions.replace('DetailsScreen', { id: item.id })
        );
      }}
      textColor='#000'
    />
  );
  return (
    <View paddingVertical={20} width='100%' gap={12}>
      <Text color='#0B080F' fontSize={20} fontWeight={700}>
        You will also like
      </Text>
      <VirtualizedList
        data={data}
        horizontal
        initialNumToRender={3}
        getItemCount={() => data?.length ?? 0}
        contentContainerStyle={{
          gap: 18,
          width: '100%',
        }}
        showsHorizontalScrollIndicator={false}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItemBook}
        style={{ width: '100%', paddingVertical: 10 }}
      />
    </View>
  );
};
