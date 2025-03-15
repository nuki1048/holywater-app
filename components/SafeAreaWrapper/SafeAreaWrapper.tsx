/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ViewProps } from '@tamagui/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';

interface SafeAreaWrapperProps extends ViewProps {
  children: React.ReactNode;
  style?: Record<string, any>;
}

export const SafeAreaWrapper = ({
  children,
  ...props
}: SafeAreaWrapperProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
      backgroundColor={props.backgroundColor ?? 'transparent'}
      {...props}
    >
      {children}
    </View>
  );
};
