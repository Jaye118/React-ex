module.exports = {
  entry: {
    main: './main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-react-jsx', {pragma: 'createElement'}]],
          }
        }
      }
    ]
  },
  mode: 'development',
  optimization: {
    minimize: false, // 默认为true，效果就是压缩js代码。
  }
}
