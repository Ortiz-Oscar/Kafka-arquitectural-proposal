const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
        SOCKET_SERVER_URL: JSON.stringify(process.env.SOCKET_SERVER_URL),
      }
    })
  ]
};
