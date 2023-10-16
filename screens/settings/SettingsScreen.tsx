import {useColorScheme, View, StyleSheet} from 'react-native';

import {getAppColorStyles} from '../../utils/styles/colors';

import {ToggleThemeTile} from './components/ToggleThemeTile';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppColorStyles(colorScheme);

  return (
    <View style={[styles.containerLayout, backgroundStyle]}>
      <ToggleThemeTile />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLayout: {
    flexDirection: 'column',
    height: '100%',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});
