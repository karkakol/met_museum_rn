module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './components',
          '@styles': './utils/styles',
          '@colors': './utils/colors.ts',
          '@constans': './utils/constans.ts',
        },
      },
    ],
  ],
};
