import {
  Appearance,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';
import {useCallback} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getAppColors} from '@colors';
import {getAppColorStyles} from '@styles/colors';

import {SettingsTilesStyle} from '../styles/SettingsTilesStyle';

import setColorScheme = Appearance.setColorScheme;

export function ToggleThemeTile() {
  const colorScheme = useColorScheme();

  const toggleColorScheme = useCallback(() => {
    if (colorScheme === 'light') setColorScheme('dark');
    else setColorScheme('light');
  }, [colorScheme]);

  const {surfaceStyle, textStyle} = getAppColorStyles(colorScheme);
  const {textColor, highlightColor} = getAppColors(colorScheme);

  const label =
    colorScheme === 'light' ? 'Enable dark mode' : 'Enable light mode';

  return (
    <TouchableHighlight
      onPress={toggleColorScheme}
      underlayColor={highlightColor}
      style={SettingsTilesStyle.touchable}>
      <View style={[SettingsTilesStyle.containerLayout, surfaceStyle]}>
        <Text style={[SettingsTilesStyle.labelLayout, textStyle]}>{label}</Text>
        <Icon
          name="lightbulb-o"
          size={32}
          color={textColor}
          style={SettingsTilesStyle.icon}
        />
      </View>
    </TouchableHighlight>
  );
}
