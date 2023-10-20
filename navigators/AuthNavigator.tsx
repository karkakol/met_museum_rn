import {useColorScheme} from 'react-native';
import type {NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FavouritesProvider} from '@providers/FavouritesProvider';
import {getAppColorStyles} from '@styles/colors';
import {getAppColors} from '@colors';

import HomeScreen from '../screens/auth/home/HomeScreen';
import DetailedMuseumScreen from '../screens/auth/DetailedMuseumScreen';
import type Museum from '../model/Museum';

export type AuthRootStackParamList = {
  Home: undefined;
  DetailedMuseum: {museum: Museum};
};

export type AuthStackNavigation = NavigationProp<AuthRootStackParamList>;

const Stack = createNativeStackNavigator<AuthRootStackParamList>();
export default function AuthNavigator() {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppColorStyles(colorScheme);
  const {backgroundColor, headerColor} = getAppColors(colorScheme);

  return (
    <FavouritesProvider>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={() => ({
          tabBarStyle: backgroundStyle,
          headerStyle: {backgroundColor},
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
    </FavouritesProvider>
  );
}
