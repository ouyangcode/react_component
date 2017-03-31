import path    from 'path'
import webpack from 'webpack'
import htmlWebpackPlugin from 'html-webpack-plugin'
import extractTextPlugin from 'extract-text-webpack-plugin'
import { ASSET_PATH }    from '../../path.config'
//webpack common plugins

const plugin = [
  new htmlWebpackPlugin({
    template: path.resolve(ASSET_PATH, 'index.html'),
    inject  : true
  }),
  new extractTextPlugin('style/[name].css', { allChunks: true }),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'scripts/vendor.bundle.js?[hash]')
]

export default plugin
