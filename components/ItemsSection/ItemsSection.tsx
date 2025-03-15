import { Text, View } from 'tamagui';
import { Book } from '../../types';
import { VirtualizedList } from 'react-native';
import { BookCard } from '../BookCard/BookCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/MainNavigator';
import { useCallback } from 'react';

interface ItemsSectionProps {
  title: string;
  items: Book[];
}
export const ItemsSection: React.FC<ItemsSectionProps> = ({ title, items }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPress = useCallback(
    (id: number) => {
      navigation.navigate('DetailsScreen', { id });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Book }) => (
      <BookCard {...item} onPress={() => onPress(item.id)} />
    ),
    [onPress]
  );
  return (
    <View paddingVertical={20} width='100%'>
      <Text color='white' fontSize={20} fontWeight={700}>
        {title}
      </Text>
      <VirtualizedList
        data={items}
        horizontal
        initialNumToRender={3}
        getItemCount={() => items.length}
        contentContainerStyle={{
          gap: 18,
          width: '100%',
        }}
        showsHorizontalScrollIndicator={false}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        style={{ width: '100%', paddingVertical: 10 }}
      />
    </View>
  );
};
