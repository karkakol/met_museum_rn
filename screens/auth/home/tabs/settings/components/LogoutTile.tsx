import React, {useContext} from 'react';
import {View, useColorScheme, TouchableHighlight, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getAppColors} from '@colors';
import {getAppColorStyles} from '@styles/colors';
import {UserContext} from '@providers/UserProvider';

import {SettingsTilesStyle} from '../styles/SettingsTilesStyle';

export const LogoutTile = () => {
  const {logout} = useContext(UserContext);

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
