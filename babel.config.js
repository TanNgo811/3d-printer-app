module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          assets: './assets',
          src: './src',
          'app.json': './app.json',
          'package.json': './package.json',
        },
      },
    ],
    ['macros'],
    ['inline-dotenv'],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
  ],
};
