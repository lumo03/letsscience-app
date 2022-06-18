require('dotenv-safe').config()

export default (config, env, helpers) => {
  config.plugins.push(
    new helpers.webpack.DefinePlugin({
      'process.env.FIREBASE_APIKEY': JSON.stringify(process.env.FIREBASE_APIKEY),
      'process.env.FIREBASE_APPID': JSON.stringify(process.env.FIREBASE_APPID),
      'process.env.FIREBASE_MESSENGERID': JSON.stringify(process.env.FIREBASE_MESSENGERID)
    })
  )
}
