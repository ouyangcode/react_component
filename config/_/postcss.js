import autoprefixer from 'autoprefixer'
import px2rem       from 'postcss-pxtorem'

const postcss = [
  autoprefixer,
  px2rem({
    rootValue    : 100,
    propWhiteList: [],
  })
]

export default postcss
