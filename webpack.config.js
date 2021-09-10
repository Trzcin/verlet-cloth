const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.ts"
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/"
      }
    ]
  },
  node: {
    __dirname: false
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./public"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public"),
    clean: true
  }
};
