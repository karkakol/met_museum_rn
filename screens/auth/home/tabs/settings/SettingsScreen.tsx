import {useColorScheme, View, StyleSheet, Pressable} from 'react-native';
import {getAppColorStyles} from '@styles/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useRef} from 'react';
import type BottomSheet from '@gorhom/bottom-sheet';

import {ToggleThemeTile} from './components/ToggleThemeTile';
import {LogoutTile} from './components/LogoutTile';
import {DeleteAccountTile} from './components/DeleteAccountTile';
import {DeleteAccountBottomSheet} from './components/DeleteAccountBottomSheet';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppColorStyles(colorScheme);
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <Pressable
      style={[{flex: 1}, backgroundStyle, styles.containerLayout]}
      onPress={() => bottomSheetRef.current?.close()}>
      <ToggleThemeTile />
      <LogoutTile />
      <DeleteAccountTile
        showBottomSheet={() => {
          bottomSheetRef.current?.expand();
        }}
      />

      <DeleteAccountBottomSheet bottomSheetController={bottomSheetRef} />
    </Pressable>
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
