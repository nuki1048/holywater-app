import { NavigationContainer } from '@react-navigation/native';
import { createTamagui, TamaguiProvider } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v4';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const config = createTamagui(defaultConfig);
  type Conf = typeof config;
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <TamaguiProvider config={config}>{children}</TamaguiProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};
