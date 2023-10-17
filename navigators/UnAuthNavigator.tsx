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
import LoginScreen from '../screens/unauth/LoginScreen';

export type MainRootStackParamList = {
  Login: undefined;
};

type MainStackNavigation = NavigationProp<MainRootStackParamList>;

const Stack = createNativeStackNavigator<MainRootStackParamList>();
export default function UnAuthNavigator() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
