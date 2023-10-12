import {
  type ColorSchemeName,
  type ImageStyle,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import {Colors} from './colors';

export function getAppStyles(schemeName: ColorSchemeName): ColorMode {
  if (schemeName === 'dark') return DarkMode;
  return LightMode;
}

interface ColorMode {
  backgroundStyle: ViewStyle | TextStyle | ImageStyle;
  surfaceStyle: ViewStyle | TextStyle | ImageStyle;
  textHeaderStyle: ViewStyle | TextStyle | ImageStyle;
  textStyle: ViewStyle | TextStyle | ImageStyle;
}

const LightMode = StyleSheet.create<ColorMode>({
  backgroundStyle: {
    backgroundColor: Colors.lightBackground,
  },
  surfaceStyle: {
    backgroundColor: Colors.lightSurface,
  },
  textHeaderStyle: {
    color: Colors.lightHeader,
  },
  textStyle: {
    color: Colors.lightText,
  },
});

const DarkMode = StyleSheet.create<ColorMode>({
  backgroundStyle: {
    backgroundColor: Colors.darkBackground,
  },
  surfaceStyle: {
    backgroundColor: Colors.darkSurface,
  },
  textHeaderStyle: {
    color: Colors.darkHeader,
  },
  textStyle: {
    color: Colors.darkText,
  },
});
