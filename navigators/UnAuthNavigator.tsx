import {Button, useColorScheme} from 'react-native';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCallback} from 'react';
import {getAppColors} from '@colors';
import {getAppColorStyles} from '@styles/colors';

import LoginScreen from '../screens/unauth/LoginScreen';
import {RegisterScreen} from '../screens/unauth/RegisterScreen';
import ResetPassword from '../screens/unauth/ResetPassword';
import TestScreen from '../screens/unauth/TestScreen';

export type UnAuthRootStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  Test: undefined;
};

export type UnAuthStackNavigation = NavigationProp<UnAuthRootStackParamList>;

const Stack = createNativeStackNavigator<UnAuthRootStackParamList>();
export default function UnAuthNavigator() {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppColorStyles(colorScheme);
  const {backgroundColor, headerColor, textColor} = getAppColors(colorScheme);
  const navigation = useNavigation<UnAuthStackNavigation>();
  const navigateToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const navigateToRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={() => ({
        tabBarStyle: backgroundStyle,
        headerStyle: {backgroundColor},
        headerTintColor: headerColor,
        headerBackTitleVisible: false,
      })}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerBackVisible: false,
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
          headerBackVisible: false,
          headerRight: () => (
            <Button
              onPress={navigateToLogin}
              title="Sign In"
              color={textColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerTitle: 'Reset Password'}}
      />
      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={{headerTitle: 'Reset Password'}}
      />
    </Stack.Navigator>
  );
}
