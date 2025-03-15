import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen/SplashScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen/DetailsScreen';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  DetailsScreen: {
    id: number;
  };
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Splash'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
    </Stack.Navigator>
  );
};
