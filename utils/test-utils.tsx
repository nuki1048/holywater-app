import { TamaguiProvider, createTamagui } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v4';
import { RenderOptions, render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const config = createTamagui(defaultConfig);
  return (
    <NavigationContainer>
      <TamaguiProvider config={config}>{children}</TamaguiProvider>
    </NavigationContainer>
  );
};

const customRender = (
  ui: React.ReactElement,
  options: RenderOptions | undefined
) => render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as renderWithAllProviders };

export * from '@testing-library/react-native';
