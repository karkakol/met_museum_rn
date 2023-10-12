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
import {getAppStyles} from './utils/styles';

export type MainRootStackParamList = {
  Home: undefined;
  DetailedMuseum: {museum: Museum};
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
  const {backgroundStyle} = getAppStyles(colorScheme);
  const {backgroundColor, headerColor} = getAppColors(colorScheme);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          tabBarStyle: backgroundStyle,
          headerStyle: {backgroundColor: backgroundColor},
          headerTintColor: headerColor,
          headerBackTitleVisible: false,
        })}>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
