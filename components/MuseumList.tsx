import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {useContext} from 'react';

import {useDebounce} from '../hooks/useDebounce';
import useAllIds from '../api/useAllIds';
import {FavouritesContext} from '../providers/FavouritesProvider';
import {getAppStyles} from '../utils/styles';

import MuseumTile from './MuseumTile';

interface MuseumListProps {
  search: string | undefined;
}

export default function MuseumList(props: MuseumListProps) {
  const colorScheme = useColorScheme();
  const debouncedSearch = useDebounce(props.search, 500);

  const favouriteContext = useContext(FavouritesContext);
  const idsAction = useAllIds(debouncedSearch ?? '');

  const renderItem = ({item}: {item: number}) => {
    return (
      <MuseumTile
        id={item}
        onFavouriteTap={() => favouriteContext.toggle(item)}
        selected={favouriteContext.selected(item)}
      />
    );
  };

  const {backgroundStyle} = getAppStyles(colorScheme);

  return (
    <View style={[styles.containerLayout, backgroundStyle]}>
      {idsAction.inProgress ? (
        <ActivityIndicator style={styles.loadingLayout} size="large" />
      ) : (
        <FlatList<number>
          style={styles.listLayout}
          data={idsAction.data}
          renderItem={renderItem}
          keyExtractor={item => item.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerLayout: {
    height: '100%',
  },
  listLayout: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  loadingLayout: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
