import {Button, useColorScheme} from 'react-native';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCallback} from 'react';

import {getAppColors} from '../utils/colors';
import LoginScreen from '../screens/unauth/LoginScreen';
import {RegisterScreen} from '../screens/unauth/RegisterScreen';
import {getAppColorStyles} from '../utils/styles/colors';
import ResetPassword from '../screens/unauth/ResetPassword';

export type UnAuthRootStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
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
      screenOptions={({route}) => ({
        tabBarStyle: backgroundStyle,
        headerStyle: {backgroundColor},
        headerTintColor: headerColor,
        headerBackTitleVisible: false,
        headerBackVisible: route.name === 'ResetPassword',
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
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerTitle: 'Reset Password'}}
      />
    </Stack.Navigator>
  );
}
