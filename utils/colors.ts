import type {ColorSchemeName} from 'react-native';

export const Colors = {
  lightBackground: 'white',
  lightSurface: '#DDDDDD',
  lightHighlight: '#222222BB',
  lightText: '#222222',
  lightHeader: '#000000',
  darkBackground: 'black',
  darkSurface: '#222222',
  darkHighlight: '#DDDDDDBB',
  darkText: '#DDDDDD',
  darkHeader: '#FFFFFF',
};

interface AppColors {
  backgroundColor: string;
  surfaceColor: string;
  highlightColor: string;
  textColor: string;
  headerColor: string;
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
  headerColor: Colors.lightHeader,
};

const DarkColors: AppColors = {
  backgroundColor: Colors.darkBackground,
  surfaceColor: Colors.darkSurface,
  highlightColor: Colors.darkHighlight,
  textColor: Colors.darkText,
  headerColor: Colors.darkHeader,
};
