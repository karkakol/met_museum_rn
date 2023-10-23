import React, {createContext, useCallback, useEffect, useState} from 'react';
import auth, {type FirebaseAuthTypes} from '@react-native-firebase/auth';

import type {ProviderProps} from '../types/ProviderProps';

interface UserContextModel {
  user: FirebaseAuthTypes.User | null;
  logout: () => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
}

export const UserContext = createContext<UserContextModel>({
  user: null,
  logout: async () => {},
  deleteAccount: async () => {},
});

export const UserProvider = (props: ProviderProps) => {
  const [cachedUser, setCachedUser] = useState<FirebaseAuthTypes.User | null>(
    auth().currentUser,
  );

  useEffect(() => {
    return auth().onAuthStateChanged(setCachedUser);
  }, []);
  const logout = useCallback(async () => {
    await auth().signOut();
  }, []);

  const deleteAccount = useCallback(async (password: string) => {
    await auth().signInWithEmailAndPassword(cachedUser?.email ?? '', password);
    await auth().currentUser?.delete();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: cachedUser,
        logout: logout,
        deleteAccount: deleteAccount,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};
