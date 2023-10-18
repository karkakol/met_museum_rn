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
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {getAppColorStyles} from '../../../utils/styles/colors';
import {getAppColors} from '../../../utils/colors';

interface AuthButtonProps {
  text: string;
  onPress: () => void;
}

export const AuthButton = ({onPress, text}: AuthButtonProps) => {
  const colorScheme = useColorScheme();
  const {textInverseStyle, backgroundInverseStyle, backgroundStyle} =
    getAppColorStyles(colorScheme);
  const {textColor} = getAppColors(colorScheme);
  const safeArea = useSafeAreaInsets();

  const keyboard = useAnimatedKeyboard();
  const buttonStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      bottom:
        keyboard.height.value +
        (safeArea.bottom * 28) / (28 + keyboard.height.value),
    };
  });

  return (
    <Animated.View style={buttonStyle}>
      <View style={[backgroundStyle]}>
        <TouchableHighlight
          underlayColor={textColor}
          hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
          style={[styles.button, backgroundInverseStyle]}
          onPress={onPress}>
          <Text style={[textInverseStyle, styles.buttonText]}>{text}</Text>
        </TouchableHighlight>
      </View>
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
