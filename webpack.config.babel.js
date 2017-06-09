import path    from 'path'
import os      from 'os'
import webpack from 'webpack'
import htmlWebpackPlugin from 'html-webpack-plugin'
import pxtorem from 'postcss-pxtorem'
import autoprefixer from 'autoprefixer'
import happyPack from 'happypack'
const happyThreadPool = happyPack.ThreadPool({ size: os.cpus().length });
const bProdEnv    = process.env.NODE_ENV === 'production'

const ROOT_PATH   = path.resolve(__dirname)
const DEMO_PATH   = path.resolve(ROOT_PATH, 'demo')
const SASS_PATH   = path.resolve(ROOT_PATH, 'sass')
const SRC_PATH    = path.resolve(ROOT_PATH, 'src')
const LIB_PATH    = path.resolve(ROOT_PATH, 'lib')
const DIST_PATH   = path.resolve(ROOT_PATH, 'dist')
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')
const ASSET_PATH  = path.resolve(ROOT_PATH, 'assets')

const config = {
  entry: {
    'app': DEMO_PATH,
    'vendor': ['react', 'react-dom', 'react-router', 'react-redux', 'redux']
  },
  output: {
    path         : DIST_PATH,
    filename     : 'script/bundle.js?[hash:8]',
    chunkFilename: 'script/[name].chunk.js?[hash:8]',
    publicPath   : ''
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(ASSET_PATH, 'index.html'),
      inject  : true,
      minify  : {    //压缩HTML文件
        removeComments    : true,    //移除HTML中的注释
        collapseWhitespace: true,   //删除空白符与换行符
        minifyJS          : true
      }
    }),
    new happyPack({
      id: 'happybabel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
    new happyPack({
      id: 'happystyle',
      loaders: [ 'style', 'css', 'postcss', 'sass' ],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'script/vendor.bundle.js?[hash:8]')
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=happybabel',
        include: [ SRC_PATH, DEMO_PATH, MODULE_PATH, LIB_PATH ]
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: 'happypack/loader?id=happystyle',
        include: [ SRC_PATH, DEMO_PATH, MODULE_PATH, SASS_PATH, LIB_PATH ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: [ SRC_PATH, MODULE_PATH, DEMO_PATH, LIB_PATH ],
        loader: 'url',
        query : {
          limit: 10000,
          name : 'image/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite',
        include: [
          require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
          SRC_PATH,  DEMO_PATH// 2. 自己私人的 svg 存放目录
        ]
      }
    ]
  },
  postcss: [
    autoprefixer,
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
    })
  ],
  resolve: {
    modulesDirectories: [
      'node_modules',
      'src'
    ],
    alias: {
      '@boluome/oto_saas_web_app_component': path.resolve(SRC_PATH),
      'common-sass': path.resolve(ROOT_PATH, 'sass')
    }
  }
}
console.log('env: ', bProdEnv)
if(!bProdEnv) {
  config.devServer = {
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: '9003',
    host: '0.0.0.0'
  }
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ])
} else {
  config.devtool = false
  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}

export default config
