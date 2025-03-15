import { ImageBackground } from 'react-native';
import { Progress, Stack, Text } from 'tamagui';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import backgound from '../../assets/bg.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigators/MainNavigator';
import { useBooksStore } from '../../stores/useBooksStore';
export const SplashScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Splash'>
> = ({ navigation }) => {
  const [value, setValue] = useState<number>(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (value === 100) {
      navigation.replace('Home');
    }
  }, [value]);

  return (
    <ImageBackground source={backgound} style={{ flex: 1 }} resizeMode='cover'>
      <Stack
        justifyContent='center'
        alignItems='center'
        paddingTop={insets.top}
        flex={1}
        backgroundColor='transparent'
      >
        <Text fontWeight='700' fontSize={52} color='#DD48A1'>
          Book App
        </Text>
        <Text color='white' fontWeight={700} fontSize={24}>
          Welcome to Book App
        </Text>
        <Progress
          width={274}
          height={6}
          value={value}
          marginTop={20}
          backgroundColor='rgba(255, 255, 255, 0.2)'
        >
          <Progress.Indicator backgroundColor='white' />
        </Progress>
      </Stack>
    </ImageBackground>
  );
};
