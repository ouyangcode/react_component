import loaderConfig   from './loaders'
import pluginConfig   from './plugins'
import aliasConfig    from './alias'
import postcssConfig  from './postcss'

import checkEnv       from './env'

const config = {
  entry : {
    vendor: [ 'react', 'react-redux', 'react-router', 'redux', 'react-dom' ]
  },
  output: {
    filename     : 'scripts/bundle.js?[hash]',
    chunkFilename: 'scripts/[name].chunk.js?[hash]'
  },
  plugins: pluginConfig,
  module : { loaders: loaderConfig },
  resolve: {
    modulesDirectories: [ 'node_modules', 'src' ],
    alias: aliasConfig
  },
  postcss: postcssConfig
}

export default checkEnv(config)
