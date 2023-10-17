import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  useColorScheme,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {getAppColorStyles} from '../../../utils/styles/colors';
import {getAppColors} from '../../../utils/colors';

interface AuthButtonProps {
  onPress: () => void;
}

export const AuthButton = ({onPress}: AuthButtonProps) => {
  const colorScheme = useColorScheme();
  const {textInverseStyle, backgroundInverseStyle, backgroundStyle} =
    getAppColorStyles(colorScheme);
  const {textColor} = getAppColors(colorScheme);

  const keyboard = useAnimatedKeyboard();
  const buttonStyle = useAnimatedStyle(() => {
    return {
      marginBottom: keyboard.height.value + 36,
    };
  });

  return (
    <Animated.View style={buttonStyle}>
      <TouchableHighlight
        underlayColor={textColor}
        hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
        style={[styles.button, backgroundInverseStyle]}
        onPress={onPress}>
        <Text style={[textInverseStyle, styles.buttonText]}>Log In</Text>
      </TouchableHighlight>
    </Animated.View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  buttonText: {fontSize: 20, alignSelf: 'center', fontWeight: 'bold'},
  button: {
    borderRadius: 20,
    margin: 12,
    padding: 12,
    width: screenWidth - 2 * 12,
  },
});
