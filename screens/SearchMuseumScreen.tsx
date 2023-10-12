import {TextInput, View, StyleSheet, useColorScheme} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import MuseumList from '../components/MuseumList';
import {getAppStyles} from '../utils/styles';
export default function SearchMuseumScreen() {
  const colorScheme = useColorScheme();
  const {textStyle, backgroundStyle, surfaceStyle} = getAppStyles(colorScheme);

  const [search, setSearch] = useState('');

  return (
    <View style={[styles.containerLayout, backgroundStyle]}>
      <View style={[styles.searchBar, surfaceStyle]}>
        <TextInput
          onChangeText={setSearch}
          value={search}
          style={[styles.inputLayout, textStyle]}
        />
        <Icon name="search" size={24} style={textStyle} />
      </View>

      <MuseumList search={search} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLayout: {
    paddingVertical: 4,
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 24,
    paddingVertical: 4,
    paddingLeft: 12,
    paddingRight: 8,
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 4,
  },
  inputLayout: {
    flex: 1,
    fontSize: 24,
  },
});
