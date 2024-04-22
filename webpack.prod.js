import { merge } from 'webpack-merge'
import common from './webpack.common.js'

const config = merge(common, {
  mode: 'production',
})
export default config
