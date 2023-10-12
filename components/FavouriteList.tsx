import {
  FlatList,
  TouchableOpacity,
  useColorScheme,
  View,
  StyleSheet,
} from 'react-native';
import React, {useContext} from 'react';

import {FavouritesContext} from '../providers/FavouritesProvider';
import {getAppStyles} from '../utils/styles';

import MuseumTile from './MuseumTile';

export default function FavouriteList() {
  const {favourites, toggle} = useContext(FavouritesContext);
  const colorScheme = useColorScheme();

  const renderItem = ({item}: {item: number}) => {
    return (
      <TouchableOpacity>
        <MuseumTile
          id={item}
          onFavouriteTap={() => toggle(item)}
          selected={favourites.includes(item)}
        />
      </TouchableOpacity>
    );
  };

  const {backgroundStyle} = getAppStyles(colorScheme);

  return (
    <View style={[styles.containerLayout, backgroundStyle]}>
      <FlatList<number>
        style={styles.listLayout}
        data={favourites}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLayout: {
    height: '100%',
  },
  listLayout: {
    padding: 8,
  },
});
