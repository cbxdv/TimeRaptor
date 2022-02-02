module.exports = [
  {
    test: /native_modules\/.+\.node$/,
    use: 'node-loader'
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules'
      }
    }
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  },
  {
    test: /\.svg$/,
    use: ['@svgr/webpack']
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    loader: 'file-loader'
  }
];
