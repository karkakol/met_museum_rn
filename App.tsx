import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth, {type FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import UnAuthNavigator from './navigators/UnAuthNavigator';
import AuthNavigator from './navigators/AuthNavigator';
import {AuthProviders} from './providers/AuthProviders';

type NullableUser = FirebaseAuthTypes.User | null;

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<NullableUser>();

  // Handle user state changes
  function onAuthStateChanged(user: NullableUser) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing)
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        {!user ? (
          <UnAuthNavigator />
        ) : (
          <AuthProviders>
            <AuthNavigator />
          </AuthProviders>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
