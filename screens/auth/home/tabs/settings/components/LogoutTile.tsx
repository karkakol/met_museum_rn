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

import {getAppColorStyles} from '../../../../../../utils/styles/colors';
import {getAppColors} from '../../../../../../utils/colors';

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
      style={styles.touchable}>
      <View style={[styles.containerLayout, surfaceStyle]}>
        <Text style={[styles.labelLayout, textStyle]}>Logout</Text>
        <Icon
          name="share-square-o"
          size={32}
          color={textColor}
          style={styles.icon}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 12,
  },
  containerLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 8,
  },
  labelLayout: {
    fontSize: 20,
  },
  icon: {
    paddingRight: 8,
  },
});
