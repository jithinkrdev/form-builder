const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.js', // Your main entry point
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2', // Ensure it's compatible with Node.js and npm
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Add .jsx extension
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  externals: {
    // React dependencies will be required as peerDependencies
    react: 'react',
    'react-dom': 'react-dom',
  },
};