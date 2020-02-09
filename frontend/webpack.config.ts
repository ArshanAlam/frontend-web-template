import * as path from "path";
import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = {
  mode: "production",
  entry: "./lib/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        // note, these are executed from last to first (so sass-loader -> style-loader)
        use: [
          // create `style` nodes from JS strings
          "style-loader",
          // translate CSS into CommonJS
          "css-loader",
          // Compile Sas to CSS
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true
    })
  ]
};

export default config;
