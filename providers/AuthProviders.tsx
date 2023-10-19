import type {ReactNode} from 'react';

import {FavouritesProvider} from './FavouritesProvider';

interface AuthProvidersProps {
  children: ReactNode;
}

export const AuthProviders: React.FC<AuthProvidersProps> = ({children}) => {
  return <FavouritesProvider>{children}</FavouritesProvider>;
};
