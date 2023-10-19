import {
  TextInput,
  View,
  StyleSheet,
  useColorScheme,
  Platform,
} from 'react-native';
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
      <View
        style={[Layouts.textInputWrapper, surfaceStyle, styles.inputWrapper]}>
        <TextInput
          onChangeText={setSearch}
          value={search}
          style={[styles.inputLayout, textStyle]}
        />
        <Icon
          name="search"
          size={Platform.OS === 'ios' ? 24 : 32}
          style={textStyle}
        />
      </View>

      <MuseumList search={search} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLayout: {
    paddingVertical: 4,
  },
  inputLayout: {
    flex: 1,
    fontSize: 24,
  },
  inputWrapper: {
    paddingVertical: 8,
  },
});
