import React, {
  createContext,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { getFavourites, toggleFavourite } from "../async_storage/LocalStorage";

interface FavouriteContextModel {
  loading: boolean;
  favourites: Array<number>;
  toggle(id: number): void;
  selected(id: number): boolean;
}

export const FavouritesContext = createContext<FavouriteContextModel>({
  loading: true,
  favourites: [],
  toggle(id: number) {},
  selected(id: number) {
    return true;
  },
});

type FavouritesProps = {
  children: ReactNode;
};

export const FavouritesProvider = (props: FavouritesProps) => {
  const [favourites, setFavourites] = useState<Array<number>>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getFavourites()
      .then(setFavourites)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id: number) => {
    toggleFavourite(id).then(setFavourites).catch(console.log);
  };

  const selected = (id: number): boolean => favourites.includes(id);

  return (
    <FavouritesContext.Provider
      value={{
        favourites: favourites,
        loading: loading,
        toggle: toggle,
        selected: selected,
      }}
    >
      {props.children}
    </FavouritesContext.Provider>
  );
};
