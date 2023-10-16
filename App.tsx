import {
  NavigationContainer,
  type NavigationProp,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';

import {FavouritesProvider} from './providers/FavouritesProvider';
import HomeScreen from './screens/HomeScreen';
import DetailedMuseumScreen from './screens/DetailedMuseumScreen';
import type Museum from './model/Museum';
import {getAppColors} from './utils/colors';
import {getAppColorStyles} from './utils/styles/colors';
import LoginScreen from './screens/LoginScreen';
import TestScreen from './screens/TestScreen';

export type MainRootStackParamList = {
  Login: undefined;
  Home: undefined;
  DetailedMuseum: {museum: Museum};
  Test: undefined;
};

export type MainStackNavigation = NavigationProp<MainRootStackParamList>;

const Stack = createNativeStackNavigator<MainRootStackParamList>();

export default function App() {
  return (
    <FavouritesProvider>
      <MainNavigator />
    </FavouritesProvider>
  );
}

function MainNavigator() {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppColorStyles(colorScheme);
  const {backgroundColor, headerColor} = getAppColors(colorScheme);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={() => ({
          tabBarStyle: backgroundStyle,
          headerStyle: {backgroundColor: backgroundColor},
          headerTintColor: headerColor,
          headerBackTitleVisible: false,
        })}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailedMuseum"
          component={DetailedMuseumScreen}
          options={({route}) => ({title: route.params.museum.title})}
        />
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
