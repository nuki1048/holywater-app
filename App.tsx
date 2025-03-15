import { useEffect } from 'react';
import useRemoteConfig from './hooks/useRemoteConfig';
import { useBooksStore } from './stores/useBooksStore';
import { MainNavigator } from './navigators/MainNavigator';
import { Providers } from './components/Providers/Providers';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'tamagui';

export default function App() {
  const { jsonData, detailsCarousel } = useRemoteConfig();
  const { initializeStore } = useBooksStore();

  useEffect(() => {
    if (!jsonData) return;
    initializeStore({ ...jsonData, detailCarousels: detailsCarousel?.books });
  }, [jsonData]);

  return (
    <SafeAreaProvider>
      <Providers>
        <View flex={1}>
          <MainNavigator />
        </View>
      </Providers>
    </SafeAreaProvider>
  );
}
