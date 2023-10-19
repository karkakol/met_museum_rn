import React, {useCallback, useState} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getAppColors} from '@colors';
import {getAppColorStyles} from '@styles/colors';

import {UnAuthStyles} from '../UnAuthStyles';

interface AuthButtonProps {
  text: string;
  onPress: () => void | Promise<void>;
}

export const AuthButton = ({onPress, text}: AuthButtonProps) => {
  const colorScheme = useColorScheme();
  const {textInverseStyle, backgroundInverseStyle, backgroundStyle} =
    getAppColorStyles(colorScheme);
  const {textColor} = getAppColors(colorScheme);
  const safeArea = useSafeAreaInsets();
  const [inProgress, setInProgress] = useState(false);

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

  const onTap = useCallback(async () => {
    if (inProgress) return;
    try {
      setInProgress(true);
      await onPress();
    } finally {
      setInProgress(false);
    }
  }, [inProgress, setInProgress]);

  return (
    <Animated.View style={buttonStyle}>
      <View style={[backgroundStyle]}>
        <TouchableHighlight
          underlayColor={textColor}
          hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
          style={[UnAuthStyles.button, backgroundInverseStyle]}
          onPress={onTap}>
          {inProgress ? (
            <ActivityIndicator />
          ) : (
            <Text style={[textInverseStyle, UnAuthStyles.buttonText]}>
              {text}
            </Text>
          )}
        </TouchableHighlight>
      </View>
    </Animated.View>
  );
};
