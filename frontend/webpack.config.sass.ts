import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";

const config: webpack.Configuration = {
  mode: "production",
  entry: "./lib/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
    chunkFilename: "chunk_[name].js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        // note, these are executed from last to first (so sass-loader -> style-loader)
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          enforce: true,
          test: /node_modules/,
          name(module) {
            // get the name of the module. ex node_modules/packageName/not/this/part.js
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // remove @ symbol from package name
            return packageName.replace("@", '');
          }
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            unused: true,
            dead_code: true,
          },
          output: {
            comments: false,
          }
        },
      })
    ]
  }
};

export default config;
