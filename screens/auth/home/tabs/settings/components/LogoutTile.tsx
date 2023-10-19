import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableHighlight,
  Text,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getAppColors} from '@colors';
import {getAppColorStyles} from '@styles/colors';

import {SettingsTilesStyle} from '../styles/SettingsTilesStyle';

export const LogoutTile = () => {
  const logout = useCallback(() => {
    auth().signOut().catch(console.log);
  }, []);

  const colorScheme = useColorScheme();
  const {surfaceStyle, textStyle} = getAppColorStyles(colorScheme);
  const {textColor, highlightColor} = getAppColors(colorScheme);

  return (
    <TouchableHighlight
      onPress={logout}
      underlayColor={highlightColor}
      style={SettingsTilesStyle.touchable}>
      <View style={[SettingsTilesStyle.containerLayout, surfaceStyle]}>
        <Text style={[SettingsTilesStyle.labelLayout, textStyle]}>Logout</Text>
        <Icon
          name="share-square-o"
          size={32}
          color={textColor}
          style={SettingsTilesStyle.icon}
        />
      </View>
    </TouchableHighlight>
  );
};
