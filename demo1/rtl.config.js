const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RtlCssPlugin = require("rtlcss-webpack-plugin");

// global variables
const rootPath = path.resolve(__dirname);
const distPath = rootPath + "/src/assets";
const entries = {
  "css/style": "./src/assets/sass/style.scss",
};

module.exports = {
  mode: "development",
  stats: "verbose",
  performance: {
    hints: "error",
    maxAssetSize: 10000000,
    maxEntrypointSize: 4000000,
  },
  entry: entries,
  output: {
    // main output path in assets folder
    path: distPath,
    // output path based on the entries' filename
    filename: "[name].js",
  },
  resolve: {
    extensions: [".scss"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].rtl.css",
    }),
    new RtlCssPlugin({
      filename: "[name].rtl.css",
    }),
    {
      apply: (compiler) => {
        // hook name
        compiler.hooks.afterEmit.tap("AfterEmitPlugin", async () => {
          const del = await import("del");
          await del.default(distPath + "/css/*.js", { force: true });
        });
      },
    },
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
