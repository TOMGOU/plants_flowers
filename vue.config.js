const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'OWNER': JSON.stringify(process.env.UNI_OWNER),
        }
      }),
    ],
  },
};
