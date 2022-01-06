/**
 * @format
 */

const BabelTransformer = require('metro-react-native-babel-transformer');
const SassTransformer = require('react-native-sass-transformer');
const PostCssTransformer = require('react-native-postcss-transformer');
const SvgTransformer = require('react-native-svg-transformer');

module.exports.transform = async function ({ src, filename, options }) {
  if (
    filename.endsWith('scss') ||
    filename.endsWith('sass') ||
    filename.endsWith('css')
  ) {
    const opts = Object.assign(options, {
      sassOptions: {
        functions: {
          'rem($px)': (px) => {
            px.setValue(px.getValue() / 16);
            px.setUnit('rem');
            return px;
          },
        },
      },
    });
    const css = await SassTransformer.renderToCSS({
      src,
      filename,
      options: opts,
    });
    return PostCssTransformer.transform({ src: css, filename, options });
  }

  if (filename.endsWith('svg')) {
    return SvgTransformer.transform({ src, filename, options });
  }

  return BabelTransformer.transform({ src, filename, options });
};
