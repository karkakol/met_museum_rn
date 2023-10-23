import {TextInput, View, StyleSheet, useColorScheme} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MuseumList from '@components/MuseumList';
import {Layouts} from '@styles/layouts';
import {getAppColorStyles} from '@styles/colors';
export default function SearchMuseumScreen() {
  const colorScheme = useColorScheme();
  const {textStyle, backgroundStyle, surfaceStyle} =
    getAppColorStyles(colorScheme);

  const [search, setSearch] = useState('');

  return (
    <View style={[styles.containerLayout, backgroundStyle]}>
      <View style={[Layouts.textInputWrapper, surfaceStyle]}>
        <TextInput
          onChangeText={setSearch}
          value={search}
          style={[Layouts.textInput, textStyle]}
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
});
