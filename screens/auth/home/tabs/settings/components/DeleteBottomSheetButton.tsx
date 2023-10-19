import React, {useCallback, useState} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import {getAppColors} from '@colors';
import {getAppColorStyles} from '@styles/colors';
import {Layouts} from '@styles/layouts';

interface AuthButtonProps {
  text: string;
  onPress: () => void | Promise<void>;
}

export const DeleteBottomSheetButton = ({onPress, text}: AuthButtonProps) => {
  const colorScheme = useColorScheme();
  const {textInverseStyle, backgroundInverseStyle} =
    getAppColorStyles(colorScheme);
  const {textColor} = getAppColors(colorScheme);
  const [inProgress, setInProgress] = useState(false);

  const onTap = useCallback(async () => {
    if (inProgress) return;
    try {
      setInProgress(true);
      await onPress();
    } finally {
      setInProgress(false);
    }
  }, [inProgress, setInProgress, onPress]);

  return (
    <View>
      <TouchableHighlight
        underlayColor={textColor}
        hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
        style={[Layouts.button, backgroundInverseStyle]}
        onPress={onTap}>
        {inProgress ? (
          <ActivityIndicator />
        ) : (
          <Text style={[textInverseStyle, Layouts.buttonText]}>{text}</Text>
        )}
      </TouchableHighlight>
    </View>
  );
};
