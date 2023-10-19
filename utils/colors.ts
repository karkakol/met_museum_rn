import type {ColorSchemeName} from 'react-native';

export const Colors = {
  lightBackground: 'white',
  lightSurface: '#DDDDDD',
  lightHighlight: '#BBBBBB',
  lightText: '#222222',
  lightHeader: '#000000',
  lightBottomSheetBackground: '#f8f8f8',
  darkBackground: 'black',
  darkSurface: '#222222',
  darkHighlight: '#DDDDDDBB',
  darkText: '#DDDDDD',
  darkHeader: '#FFFFFF',
  darkBottomSheetBackground: '#111111',
};

interface AppColors {
  backgroundColor: string;
  surfaceColor: string;
  highlightColor: string;
  textColor: string;
  textInverseColor: string;
  headerColor: string;
  bottomSheetBackgroundColor: string;
}

export function getAppColors(colorScheme: ColorSchemeName) {
  if (colorScheme === 'dark') return DarkColors;
  return LightColors;
}

const LightColors: AppColors = {
  backgroundColor: Colors.lightBackground,
  surfaceColor: Colors.lightSurface,
  highlightColor: Colors.lightHighlight,
  textColor: Colors.lightText,
  textInverseColor: Colors.darkText,
  headerColor: Colors.lightHeader,
  bottomSheetBackgroundColor: Colors.lightBottomSheetBackground,
};

const DarkColors: AppColors = {
  backgroundColor: Colors.darkBackground,
  surfaceColor: Colors.darkSurface,
  highlightColor: Colors.darkHighlight,
  textColor: Colors.darkText,
  textInverseColor: Colors.lightText,
  headerColor: Colors.darkHeader,
  bottomSheetBackgroundColor: Colors.darkBottomSheetBackground,
};
