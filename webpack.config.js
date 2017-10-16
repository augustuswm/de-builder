var build = {
  entry: {
    'builder': './src/builder.jsx',
    'demo': './src/demo.jsx',
    'preview': './src/preview.jsx'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/
        ],
        use: [
          'babel-loader'
        ]
      }
    ]
  }
};

var demo = {
  entry: {
    'builder': './src/builder.jsx',
    'demo': './src/demo.jsx',
    'preview': './src/preview.jsx'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/demo/js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/
        ],
        use: [
          'babel-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/demo',
    compress: true
  }
};

module.exports = demo;