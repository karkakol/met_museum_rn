import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  type NavigationProp,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {getAppColorStyles} from '../utils/styles/colors';
import {getAppColors} from '../utils/colors';
import HomeScreen from '../screens/auth/home/HomeScreen';
import DetailedMuseumScreen from '../screens/auth/DetailedMuseumScreen';
import type Museum from '../model/Museum';
import {FavouritesProvider} from '../providers/FavouritesProvider';

export type MainRootStackParamList = {
  Home: undefined;
  DetailedMuseum: {museum: Museum};
};

type MainStackNavigation = NavigationProp<MainRootStackParamList>;

const Stack = createNativeStackNavigator<MainRootStackParamList>();
export default function AuthNavigator() {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppColorStyles(colorScheme);
  const {backgroundColor, headerColor} = getAppColors(colorScheme);

  return (
    <FavouritesProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
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
    </FavouritesProvider>
  );
}
