var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');
var WriteFilePlugin = require('write-file-webpack-plugin');

var definePlugin = new webpack.DefinePlugin({
  // this first as advised to get the correct production build of redux
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || '"development"',
  __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG_ERROR || 'false')),
  __REDUX_LOG__: JSON.stringify(JSON.parse(process.env.REDUX_LOG || 'false')),
  __REDUX_DEV_UI__: JSON.stringify(JSON.parse(process.env.REDUX_DEV_UI || 'false')),
  __TEST__: false,
  'global.GENTLY': false, // https://github.com/visionmedia/superagent/wiki/SuperAgent-for-Webpack for platform-client
});

if (process.env.DEBUG_ERROR === 'true') {
  console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~');
  console.log('### DEBUG MODE ###');
  console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~');
  console.log();
}

if ((!process.env.API_URL && !process.env.UPLOAD_URL && !process.env.DATA_URL && !process.env.BLIP_URL)) {
  console.log('Using the default environment, which is now production.');
} else {
  console.log('***** NOT using the default environment *****');
  console.log('The default right-click server menu may be incorrect.');
  console.log('API_URL =', process.env.API_URL);
  console.log('UPLOAD_URL =', process.env.UPLOAD_URL);
  console.log('DATA_URL =', process.env.DATA_URL);
  console.log('BLIP_URL =', process.env.BLIP_URL);
}

var config = {
  entry: './entry.js',
  devtool: '#cheap-module-source-map',
  devServer: {
    outputPath: path.join(__dirname, '/build'),
    publicPath: './build/'
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: './build/',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules)/, loaders: ['react-hot', 'babel-loader'] },
      { test: /\.jsx$/, exclude: /(node_modules)/, loaders: ['react-hot', 'babel-loader'] },
      { test: /\.module\.less$/, loader: 'style?sourceMap!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less?sourceMap' },
      { test: /^((?!module).)*\.less$/, loader: 'style!css!less' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(png|jpg|woff)$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    definePlugin,
    new WriteFilePlugin()
  ],
  // to fix the 'broken by design' issue with npm link-ing modules
  resolve: { fallback: path.join(__dirname, 'node_modules') },
  resolveLoader: { fallback: path.join(__dirname, 'node_modules') },
  target: 'electron',
  node: {
    __dirname: true, // https://github.com/visionmedia/superagent/wiki/SuperAgent-for-Webpack for platform-client
  }
};

module.exports = config;
