import React from 'react';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppButton, type AppButtonProps} from '@components/AppButton';
import {useColorScheme, View} from 'react-native';
import {getAppColorStyles} from '@styles/colors';

export const AuthButton = ({onPress, text}: AppButtonProps) => {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppColorStyles(colorScheme);
  const safeArea = useSafeAreaInsets();

  const keyboard = useAnimatedKeyboard();
  const buttonStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      //when keyboard height is 0 bottom is the height of safeArea.bottom, when height is increasing this expresion is similar to keyboard height
      bottom:
        keyboard.height.value +
        (safeArea.bottom * 28) / (28 + keyboard.height.value),
    };
  });

  return (
    <View style={backgroundStyle}>
      <Animated.View style={buttonStyle}>
        <AppButton text={text} onPress={onPress} />
      </Animated.View>
    </View>
  );
};
