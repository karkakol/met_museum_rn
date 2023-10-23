import type {ProviderProps} from '../types/ProviderProps';

import {FavouritesProvider} from './FavouritesProvider';
import {UserProvider} from './UserProvider';

export const AuthProviders: React.FC<ProviderProps> = ({children}) => {
  return (
    <UserProvider>
      <FavouritesProvider>{children}</FavouritesProvider>
    </UserProvider>
  );
};
