import {
  type ColorSchemeName,
  type ImageStyle,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

export function getAppColorStyles(schemeName: ColorSchemeName): ColorMode {
  if (schemeName === 'dark') return DarkMode;
  return LightMode;
}
import {Colors} from '../colors';
interface ColorMode {
  backgroundStyle: ViewStyle | TextStyle | ImageStyle;
  bottomSheetBackgroundStyle: ViewStyle | TextStyle | ImageStyle;
  backgroundInverseStyle: ViewStyle | TextStyle | ImageStyle;
  surfaceStyle: ViewStyle | TextStyle | ImageStyle;
  textHeaderStyle: ViewStyle | TextStyle | ImageStyle;
  textStyle: ViewStyle | TextStyle | ImageStyle;
  textInverseStyle: ViewStyle | TextStyle | ImageStyle;
}

const LightMode = StyleSheet.create<ColorMode>({
  backgroundStyle: {
    backgroundColor: Colors.lightBackground,
  },
  backgroundInverseStyle: {
    backgroundColor: Colors.darkBackground,
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
  textInverseStyle: {
    color: Colors.darkText,
  },
  bottomSheetBackgroundStyle: {
    backgroundColor: Colors.lightBottomSheetBackground,
  },
});

const DarkMode = StyleSheet.create<ColorMode>({
  backgroundStyle: {
    backgroundColor: Colors.darkBackground,
  },
  backgroundInverseStyle: {
    backgroundColor: Colors.lightBackground,
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
  textInverseStyle: {
    color: Colors.lightText,
  },
  bottomSheetBackgroundStyle: {
    backgroundColor: Colors.darkBottomSheetBackground,
  },
});
