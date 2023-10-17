import {Button, useColorScheme} from 'react-native';
import {
  NavigationContainer,
  type NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCallback} from 'react';

import {getAppColorStyles} from '../utils/styles/colors';
import {getAppColors} from '../utils/colors';
import HomeScreen from '../screens/auth/home/HomeScreen';
import DetailedMuseumScreen from '../screens/auth/DetailedMuseumScreen';
import type Museum from '../model/Museum';
import LoginScreen from '../screens/unauth/LoginScreen';
import {RegisterScreen} from '../screens/unauth/RegisterScreen';

import {AuthStackNavigation} from './AuthNavigator';

export type UnAuthRootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type UnAuthStackNavigation = NavigationProp<UnAuthRootStackParamList>;

const Stack = createNativeStackNavigator<UnAuthRootStackParamList>();
export default function UnAuthNavigator() {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppColorStyles(colorScheme);
  const {backgroundColor, headerColor, textColor} = getAppColors(colorScheme);
  const navigation = useNavigation<UnAuthStackNavigation>();
  const navigateToLogin = useCallback(() => {
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  }, [navigation]);

  const navigateToRegister = useCallback(() => {
    navigation.reset({index: 0, routes: [{name: 'Register'}]});
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={() => ({
        tabBarStyle: backgroundStyle,
        headerStyle: {backgroundColor: backgroundColor},
        headerTintColor: headerColor,
        headerBackTitleVisible: false,
      })}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={navigateToRegister}
              title="Sign Up"
              color={textColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={navigateToLogin}
              title="Sign In"
              color={textColor}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
