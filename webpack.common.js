/*
 * Copyright (c) 2020-22 Prolincur Technologies LLP.
 * All Rights Reserved.
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        'three-dxf-loader': './src/loader/index.js',
        'three-dxf-viewer': './src/viewer/index.js'
    },
    experiments: {
        outputModule: true
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: { type: "module" },
        environment: { module: true },
        globalObject: "this",
    },
    externalsType: "module",
    externals: {
        three: 'three',
        'three/examples/jsm/geometries/TextGeometry.js': 'three/examples/jsm/geometries/TextGeometry.js',
        'three/examples/jsm/controls/OrbitControls.js': 'three/examples/jsm/controls/OrbitControls.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Production',
        }),
		new webpack.BannerPlugin(
		'Copyright (c) 2021-23 Prolincur Technologies LLP.\nCopyright (c) 2015 GDS Storefront Estimating\nAll Rights Reserved.\n\n' +
		'Please check the provided LICENSE file for licensing details.\n' +
		'\n' +
		'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,\n' +
		'INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR\n' +
		'PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE\n' +
		'LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT\n' +
		'OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\n' +
		'OTHER DEALINGS IN THE SOFTWARE.\n'
		)
  ]
};