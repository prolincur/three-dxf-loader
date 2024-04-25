/*
 * Copyright (c) 2020-24 Prolincur Technologies LLP.
 * All Rights Reserved.
 */

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import nodeExternals from 'webpack-node-externals'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const webpackEnv = process.env.NODE_ENV || 'production'
const isDev = webpackEnv === 'development'

const config = {
  mode: webpackEnv,
  devtool: isDev ? 'inline-source-map' : undefined,
  entry: {
    'three-dxf-loader': './src/loader/index.js',
    'three-dxf-viewer': './src/viewer/index.js',
  },
  experiments: {
    outputModule: true,
  },
  output: {
    filename: '[name].js',
    // path: path.resolve(__dirname, 'dist'),
    library: { type: 'module' },
    environment: { module: true },
    globalObject: 'this',
  },
  externalsType: 'module',
  externals: [
    'three',
    'three/examples/jsm/geometries/TextGeometry.js',
    'three/examples/jsm/controls/OrbitControls.js'
  ],
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin(
      'Copyright (c) 2021-24 Prolincur Technologies LLP.\nCopyright (c) 2015 GDS Storefront Estimating\nAll Rights Reserved.\n\n' +
        'Please check the provided LICENSE file for licensing details.\n' +
        '\n' +
        'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,\n' +
        'INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR\n' +
        'PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE\n' +
        'LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT\n' +
        'OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\n' +
        'OTHER DEALINGS IN THE SOFTWARE.\n'
    ),
  ],
}

const nodeConfig = {
  ...config,
  target: 'node',
  externals: [
    ...config.externals,
    nodeExternals()
  ],
  output: {
    ...config.output,
    path: path.resolve(__dirname, 'dist/node'),
    chunkFormat: 'module',
  }
}

const browserConfig = {
  ...config,
  target: 'web',
  output: {
    ...config.output,
    // path: path.resolve(__dirname, 'dist/browser'),
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    ...config.plugins,
    new HtmlWebpackPlugin({
      title: 'Production',
    }),
  ]
}


// export default [nodeConfig, browserConfig]
export default [browserConfig]
