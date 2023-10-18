import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getAppColors} from '@colors';
import {Layouts} from '@styles/layouts';
import {getAppColorStyles} from '@styles/colors';

interface AppTextInputProps {
  text: string;
  setText: (text: string) => void;
  obscure?: boolean;
  placeholder?: string;
}

export const AuthTextInput = ({
  text,
  setText,
  obscure = false,
  placeholder = '',
}: AppTextInputProps) => {
  const colorScheme = useColorScheme();
  const {textStyle, surfaceStyle} = getAppColorStyles(colorScheme);
  const {highlightColor} = getAppColors(colorScheme);

  const [showText, setShowText] = useState(true);

  return (
    <View style={[Layouts.textInputWrapper, surfaceStyle]}>
      <TextInput
        placeholder={placeholder}
        onChangeText={setText}
        value={text}
        style={[styles.inputLayout, textStyle]}
        secureTextEntry={obscure && showText}
        autoCapitalize="none"
      />
      {obscure ? (
        <TouchableHighlight
          underlayColor={highlightColor}
          hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
          style={[styles.iconTouchable]}
          onPress={() => setShowText(prevState => !prevState)}>
          <Icon
            name={showText ? 'eye' : 'eye-slash'}
            size={28}
            style={textStyle}
          />
        </TouchableHighlight>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputLayout: {
    flex: 1,
    fontSize: 24,
    height: 40,
  },
  iconTouchable: {
    borderRadius: 16,
    padding: 4,
  },
});
