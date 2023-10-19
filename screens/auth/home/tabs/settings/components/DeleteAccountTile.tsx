import React from 'react';
import {View, useColorScheme, TouchableHighlight, Text} from 'react-native';
import {getAppColorStyles} from '@styles/colors';
import {getAppColors} from '@colors';
import Icon from 'react-native-vector-icons/FontAwesome';

import {SettingsTilesStyle} from '../styles/SettingsTilesStyle';

interface DeleteAccountTileProps {
  showBottomSheet: () => void;
}

export const DeleteAccountTile = ({
  showBottomSheet,
}: DeleteAccountTileProps) => {
  const colorScheme = useColorScheme();
  const {surfaceStyle, textStyle} = getAppColorStyles(colorScheme);
  const {textColor, highlightColor} = getAppColors(colorScheme);

  return (
    <View>
      <TouchableHighlight
        onPress={showBottomSheet}
        underlayColor={highlightColor}
        style={SettingsTilesStyle.touchable}>
        <View style={[SettingsTilesStyle.containerLayout, surfaceStyle]}>
          <Text style={[SettingsTilesStyle.labelLayout, textStyle]}>
            Delete account
          </Text>
          <Icon
            name="times-circle"
            size={32}
            color={textColor}
            style={SettingsTilesStyle.icon}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};
