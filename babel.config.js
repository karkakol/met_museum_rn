module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@providers': './providers',
          '@components': './components',
          '@styles': './utils/styles',
          '@colors': './utils/colors.ts',
          '@constants': './utils/constants.ts',
          '@firebaseTranslations': './utils/firebase/ErrorTranslation.ts',
        },
      },
    ],
  ],
};
