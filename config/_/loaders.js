import extractTextPlugin from 'extract-text-webpack-plugin'
import { SRC_PATH, MODULE_PATH } from '../../path.config'
//webpack loaders
const loader =
[
  {
    test: /\.jsx?$/,
    loader: 'babel',
    include: [ SRC_PATH, MODULE_PATH ]
  },
  {
    test: /\.(css|scss|sass)$/,
    include: [ SRC_PATH, MODULE_PATH ],
    loaders: [ 'style', 'css', 'postcss', 'sass' ]
    // loader: extractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader')
  },
  {
    test: /\.(png|jpg|gif|svg)$/,
    include: [ SRC_PATH, MODULE_PATH ],
    loader: 'url',
    query : {
      limit: 10000,
      name : '[name].[ext]?[hash]'
    }
  }
]

export default loader
