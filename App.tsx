import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth, {type FirebaseAuthTypes} from '@react-native-firebase/auth';

import UnAuthNavigator from './navigators/UnAuthNavigator';
import AuthNavigator from './navigators/AuthNavigator';

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

  if (!user) {
    return <UnAuthNavigator />;
  }

  return <AuthNavigator />;
}
