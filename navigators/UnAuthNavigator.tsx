import {Button, useColorScheme} from 'react-native';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCallback} from 'react';

import {getAppColors} from '../utils/colors';
import LoginScreen from '../screens/unauth/LoginScreen';
import {RegisterScreen} from '../screens/unauth/RegisterScreen';
import {getAppColorStyles} from '../utils/styles/colors';

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
        headerStyle: {backgroundColor: backgroundColor},
        headerTintColor: headerColor,
        headerBackTitleVisible: false,
        headerBackVisible: false,
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
