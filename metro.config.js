/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig('.');

  return {
    transformer: {
      babelTransformerPath: require.resolve('./transformer.config.js'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      sourceExts: [...sourceExts, 'css', 'sass', 'scss', 'svg', 'json'],
      assetExts: assetExts.filter(
        (ext) => !ext.match(/(svg|sass|scss|css|json)$/)
      ),
    },
  };
})();
