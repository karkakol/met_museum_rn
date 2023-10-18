import {useColorScheme, View, StyleSheet} from 'react-native';
import {getAppColorStyles} from '@styles/colors';

import {ToggleThemeTile} from './components/ToggleThemeTile';
import {LogoutTile} from './components/LogoutTile';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppColorStyles(colorScheme);

  return (
    <View style={[styles.containerLayout, backgroundStyle]}>
      <ToggleThemeTile />
      <LogoutTile />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLayout: {
    gap: 12,
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});
